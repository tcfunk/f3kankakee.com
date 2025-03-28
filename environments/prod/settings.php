<?php

include_once __DIR__ . './settings.database.php';

// This will prevent Drupal from setting read-only permissions on sites/default.
$settings['skip_permissions_hardening'] = FALSE;

// This will ensure the site can only be accessed through the intended host
// names. Additional host patterns can be added for custom configurations.
$settings['trusted_host_patterns'] = [
  '^159\.223\.128\.50$',
  '^f3kankakee\.com$',
];

$settings['update_free_access'] = FALSE;
