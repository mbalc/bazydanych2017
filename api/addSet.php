<?php
  include 'headers.php';

  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  //Attempt to decode the incoming RAW post data from JSON.
  $decoded = json_decode($content, true);

  $stmt = pg_prepare($link, "add_set", 'SELECT wstaw_seta($1);');
  print_r(pg_last_error());

  $result = pg_execute($link, "add_set", array($decoded[mecz]));
  print_r(pg_last_error());
?>
