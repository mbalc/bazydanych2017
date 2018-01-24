<?php
  include 'headers.php';

  $wynik = pg_query($link, "select id, nazwa, (select count(*) from gracz where druzyna=p1.id) as \"ilu członków\" from druzyna p1;");

  $resultArray = pg_fetch_all($wynik);
  echo json_encode($resultArray);
?>
