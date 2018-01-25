<?php
  include 'headers.php';

  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  //Attempt to decode the incoming RAW post data from JSON.
  $decoded = json_decode($content, true);

  $stmt = pg_prepare($link, "get_squad_ids", 'SELECT skladGosci, skladGospodarzy FROM mecz WHERE id=$1;');
  print_r(pg_last_error());

  $result = pg_execute($link, "get_squad_ids", array($decoded[mecz]));
  print_r(pg_last_error());

  $squad_ids = pg_fetch_all($result);
  $g = $squad_ids[0][skladgosci];
  $h = $squad_ids[0][skladgospodarzy];


  $stmt = pg_prepare($link, "setup_squad", 'INSERT INTO wynik (punkty, numerseta, sklad, mecz) VALUES (0, 1, $1, $2)');
  print_r(pg_last_error());

  $result = pg_execute($link, "setup_squad", array($g, $decoded[mecz]));
  print_r(pg_last_error());


  $result = pg_execute($link, "setup_squad", array($h, $decoded[mecz]));
  print_r(pg_last_error());
?>
