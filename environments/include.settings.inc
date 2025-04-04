<?php

include_once __DIR__ . '/environment.inc';

// Common settings.
$settings['config_sync_directory'] = '../config/sync';
$settings['hash_salt'] = '351de7b8740e03344b38d7a6fdc0ba5b34ccc012f45ddec181f734795412665f';
$settings['file_private_path'] = '../private';

// Load common services.
$settings['container_yamls'][] = __DIR__ . "/services.yml";

// Load environment settings and services.
if ($environment) {
  include_once __DIR__ . "/$environment/settings.php";
  $services_file = __DIR__ . "/$environment/services.yml";
  if (file_exists($services_file)) {
    $settings['container_yamls'][] = $services_file;
  }
}
