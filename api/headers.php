<?php
  include 'config.php';

  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  header('Content-type: application/json');
  //<meta http-equiv="Content-Type" content="application/json; charset=utf-8">
  //<html>
  //<title>Drużyny</title>
  //<body>
  $link = pg_connect($db_config);
?>
