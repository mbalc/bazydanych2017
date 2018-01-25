<?php
  include 'headers.php';

  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  //Attempt to decode the incoming RAW post data from JSON.
  $decoded = json_decode($content, true);

  $stmt = pg_prepare($link, "get_squad_ids", 'SELECT skladGosci, skladGospodarzy FROM mecz WHERE id=$1;');
  print_r(pg_last_error());

  $result = pg_execute($link, "get_squad_ids", array($decoded[id]));
  print_r(pg_last_error());

  $squad_ids= pg_fetch_all($result);
  $g = $squad_ids[0][skladgosci];
  $h = $squad_ids[0][skladgospodarzy];

  $stmt = pg_prepare($link, "get_squad", 'SELECT id, imie, nazwisko FROM udzial p JOIN gracz q ON p.gracz = q.id WHERE p.sklad = $1;');
  print_r(pg_last_error());


  $result = pg_execute($link, "get_squad", array($g));
  $guests = pg_fetch_all($result);

  $result = pg_execute($link, "get_squad", array($h));
  $hosts= pg_fetch_all($result);

  $stmt = pg_prepare($link, "get_sets", "SELECT \"punkty gospodarzy\", \"id\" AS \"numer seta\", \"punkty gości\" FROM widok_setow WHERE mecz=$1 ORDER BY \"id\"");
  print_r(pg_last_error());

  $result = pg_execute($link, "get_sets", array($decoded[id]));
  print_r(pg_last_error());

  $sety = pg_fetch_all($result);
  // if (!$sety) $sety = array();

  echo json_encode(array('goście' => $guests, 'gospodarze' => $hosts, 'sety' => $sety));

  print_r(pg_last_error());
?>
