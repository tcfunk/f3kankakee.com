<?php

declare(strict_types=1);

namespace Drupal\f3k3_blocks\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\media\Entity\Media;
/**
 * Provides a hero block.
 */
#[Block(
  id: 'f3k3_blocks_hero',
  admin_label: new TranslatableMarkup('Hero'),
  category: new TranslatableMarkup('f3k3'),
)]
final class HeroBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function defaultConfiguration(): array {
    return [
      'title' => $this->t('Hero Block'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state): array {
    $selected_media = Media::load($this->configuration['background_image']);

    $form['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Title'),
      '#default_value' => $this->configuration['title'],
    ];
    $form['message'] = [
      '#type' => 'text_format',
      '#title' => $this->t('Hero Message'),
      '#default_value' => $this->configuration['message']['value'],
      '#format' => 'content_format',
    ];
    $form['background_image'] = [
      '#type' => 'entity_autocomplete',
      '#title' => $this->t('Background image'),
      '#target_type' => 'media',
      '#default_value' => $selected_media,
      '#widget_type' => 'media_library_widget',
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state): void {
    $this->configuration['title'] = $form_state->getValue('title');
    $this->configuration['message'] = $form_state->getValue('message');
    $this->configuration['background_image'] = $form_state->getValue('background_image');
  }

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    $build['title'] = [
      '#type' => 'html_tag',
      '#tag' => 'h1',
      '#value' => $this->configuration['title'],
    ];
    $build['message'] = [
      '#type' => 'processed_text',
      '#text' => $this->configuration['message']['value'],
      '#format' => $this->configuration['message']['format'],
    ];

    $selected_media = Media::load($this->configuration['background_image']);
    if ($selected_media) {
      $selected_media_image = $selected_media->get('field_media_image')->view('hero_wide');
      $build['background_image'] = $selected_media_image;
    }

    return $build;
  }

}
