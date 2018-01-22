<?php
  include 'creds.php';

  header("Access-Control-Allow-Origin: *");
  header('Content-type: application/json');
  //<meta http-equiv="Content-Type" content="application/json; charset=utf-8">
  //<html>
  //<title>Drużyny</title>
  //<body>
  $link = pg_connect("host=labdb dbname=bd user='$db_username' password='$db_password'");
?>