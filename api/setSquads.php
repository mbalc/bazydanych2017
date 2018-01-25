<?php
  include 'headers.php';

//Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  //Attempt to decode the incoming RAW post data from JSON.
  $decoded = json_decode($content, true);

  $stmt = pg_prepare($link, "start_transaction", 'BEGIN;');
  print_r(pg_last_error());

  $result = pg_execute($link, "start_transaction", array());
  print_r(pg_last_error());

  $stmt = pg_prepare($link, "get_squad_ids", 'SELECT skladGosci, skladGospodarzy FROM mecz WHERE id=$1;');
  print_r(pg_last_error());

  $result = pg_execute($link, "get_squad_ids", array($decoded[mecz]));
  print_r(pg_last_error());

  $squad_ids = pg_fetch_all($result);
  $g = $squad_ids[0][skladgosci];
  $h = $squad_ids[0][skladgospodarzy];

  $stmt = pg_prepare($link, "delete_squads", 'DELETE FROM udzial WHERE sklad=$1 OR sklad=$2;');
  print_r(pg_last_error());

  $result = pg_execute($link, "delete_squads", array($g, $h));
  print_r(pg_last_error());

  print_r($g);
  print_r($squad_ids);

 foreach($decoded[goscie] as $data) {
    $stmt = pg_prepare($link, "guest_squad_".$data, 'INSERT INTO udzial (gracz, sklad) VALUES ($1, $2);');
    print_r(pg_last_error());

    $result = pg_execute($link, "guest_squad_".$data, array($data, $g));
    print_r(pg_last_error());
 }

 foreach($decoded[gospodarze] as $data) {
    $stmt = pg_prepare($link, "host_squad_".$data, 'INSERT INTO udzial (gracz, sklad) VALUES ($1, $2);');
    print_r(pg_last_error());

    $result = pg_execute($link, "host_squad_".$data, array($data, $h));
    print_r(pg_last_error());
 }


  $stmt = pg_prepare($link, "end_transaction", 'COMMIT;');
  print_r(pg_last_error());

  $result = pg_execute($link, "end_transaction", array());
  print_r(pg_last_error());

?>
