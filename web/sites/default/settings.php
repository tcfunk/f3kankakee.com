<?php

// phpcs:ignoreFile
//
//

include dirname(DRUPAL_ROOT) . '/environments/include.settings.inc';


// Automatically generated include for settings managed by ddev.
$ddev_settings = __DIR__ . '/settings.ddev.php';
if (getenv('IS_DDEV_PROJECT') == 'true' && is_readable($ddev_settings)) {
  require $ddev_settings;
}
