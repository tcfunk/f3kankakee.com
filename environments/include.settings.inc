<?php

$environment = false;

if (@getenv('LANDO') == 'ON' && file_exists(__DIR__ . '/lando/settings.php')) {
  $environment = 'lando';
} elseif (@getenv('ENV') == 'prod' && file_exists(__DIR__ . '/prod/settings.php')) {
  $environment = 'prod';
}

if ($environment) {
  include_once __DIR__ . "/$environment/settings.php";
}


$settings['config_sync_directory'] = '../config/sync';
$settings['hash_salt'] = '351de7b8740e03344b38d7a6fdc0ba5b34ccc012f45ddec181f734795412665f';
$settings['file_private_path'] = '../private';
