<?php
  include 'headers.php';

  $wynik = pg_query($link, "SELECT * FROM druzyna");

  $resultArray = pg_fetch_all($wynik);
  echo json_encode($resultArray);
  //</body>
  //</html>
?>
