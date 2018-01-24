<?php
  include 'headers.php';

  $wynik = pg_query($link, "SELECT * FROM termin ORDER BY termin ASC LIMIT 1");

  $resultArray = pg_fetch_all($wynik);
  echo json_encode($resultArray);
?>