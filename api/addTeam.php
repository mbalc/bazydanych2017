<?php
  include 'headers.php';

//Receive the RAW post data.
 $content = trim(file_get_contents("php://input"));
 
 //Attempt to decode the incoming RAW post data from JSON.
 $decoded = json_decode($content, true);

 $stmt = pg_prepare($link, "my_query", 'INSERT INTO druzyna (nazwa) VALUES ($1)');

 print_r($stmt);
 print_r(pg_last_error());

 $result = pg_execute($link, "my_query", array($decoded[nazwa]));

 print_r($result);
 print_r(pg_last_error());

?>
