<?php
  include 'headers.php';

  $wynik = pg_query($link, "INSERT INTO termin (termin) VALUES (now())");
?>