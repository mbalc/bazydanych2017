<?php
  include 'headers.php';

  $query = file_get_contents("../deploy.sql");

  $wynik = pg_query($link, $query);

  $resultArray = pg_fetch_all($wynik);
  echo json_encode($resultArray);
  print_r(pg_last_error());
?>
