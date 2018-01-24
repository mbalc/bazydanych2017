<?php
  include 'headers.php';

$wynik = pg_query($link, "SELECT * FROM widok_meczy");

  $resultArray = pg_fetch_all($wynik);
  echo json_encode($resultArray);
?>
