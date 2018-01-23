<?php
  include 'headers.php';

  $query = file_get_contents("../deploy.sql");

  $wynik = pg_query($link, $query);

?>
