<?php
  include 'headers.php';

//Receive the RAW post data.
 $content = trim(file_get_contents("php://input"));

 //Attempt to decode the incoming RAW post data from JSON.
 $decoded = json_decode($content, true);

 $stmt = pg_prepare($link, "setup_squad", 'INSERT INTO sklad (druzyna) VALUES ($1) RETURNING id');
 print_r(pg_last_error());

 $result = pg_execute($link, "setup_squad", array($decoded[gospodarze]));
 print_r(pg_last_error());

 $resultArray = pg_fetch_all($result);
 $gospodarze = $resultArray[0][id];


 $result = pg_execute($link, "setup_squad", array($decoded[goscie]));
 print_r(pg_last_error());

 $resultArray = pg_fetch_all($result);
 $goscie = $resultArray[0][id];


 $stmt = pg_prepare($link, "setup_match", 'INSERT INTO mecz (skladGospodarzy, skladGosci) VALUES ($1, $2)');
 print_r(pg_last_error());

 $result = pg_execute($link, "setup_match", array($gospodarze, $goscie));
 print_r(pg_last_error());



?>
