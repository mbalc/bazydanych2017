<?php
  include 'headers.php';

  $wynik = pg_query($link, "SELECT * FROM gracz");

  $resultArray = pg_fetch_all($wynik);
  echo json_encode($resultArray);
?>
