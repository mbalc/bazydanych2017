<?php
  include 'headers.php';

  $options = array(
    'http' => array(
      'header'  => "Content-type: application/json\r\n",
      'method'  => 'POST',
      'content' => ''
    )
  );

  $teams = array(
    array('nazwa' => 'Politycy'),
    array('nazwa' => 'Janusze'),
    array('nazwa' => 'Januszowie')
  );

  $players = array(
    array('imie' => 'Donald', 'nazwisko' => 'Trump', 'druzyna' => '1'),
    array('imie' => 'Hillary', 'nazwisko' => 'Clinton', 'druzyna' => '1'),
    array('imie' => 'Angela', 'nazwisko' => 'Merkel', 'druzyna' => '1'),
    array('imie' => 'Janusz', 'nazwisko' => 'Korwin-Mikke', 'druzyna' => '1'),
    array('imie' => 'Włodzimierz', 'nazwisko' => 'Cimoszewicz', 'druzyna' => '1'),
    array('imie' => 'Ryszard', 'nazwisko' => 'Petru', 'druzyna' => '1'),
    array('imie' => 'George', 'nazwisko' => 'Washington', 'druzyna' => '1'),
    array('imie' => 'George', 'nazwisko' => 'Bush', 'druzyna' => '1'),
    array('imie' => 'Theodore', 'nazwisko' => 'Roosevelt', 'druzyna' => '1'),
    array('imie' => 'Janusz', 'nazwisko' => 'Niezbędny', 'druzyna' => '2'),
    array('imie' => 'Janusz', 'nazwisko' => 'Przydatny', 'druzyna' => '2'),
    array('imie' => 'Janusz', 'nazwisko' => 'Użyteczny', 'druzyna' => '2'),
    array('imie' => 'Janusz', 'nazwisko' => 'Niezastąpiony', 'druzyna' => '2'),
    array('imie' => 'Janusz', 'nazwisko' => 'Nieodzowny', 'druzyna' => '2'),
    array('imie' => 'Janusz', 'nazwisko' => 'Potrzebny', 'druzyna' => '2'),
    array('imie' => 'Janusz', 'nazwisko' => 'Mazowiecki', 'druzyna' => '3'),
    array('imie' => 'Janusz', 'nazwisko' => 'Kielecki', 'druzyna' => '3'),
    array('imie' => 'Janusz', 'nazwisko' => 'Podlaski', 'druzyna' => '3'),
    array('imie' => 'Janusz', 'nazwisko' => 'Małopolski', 'druzyna' => '3')
  );

  $matches = array(
    array('goscie' => '2', 'gospodarze' => '1', 'komentarz' => 'Janusze przegrywają z kretesem!'),
    array('goscie' => '1', 'gospodarze' => '2', 'komentarz' => 'Kolejne zwycięstwo niezwyciężonych polityków!'),
    array('goscie' => '1', 'gospodarze' => '2', 'komentarz' => 'Czy Janusze zdołają się zrewanżować?!'),
    array('goscie' => '2', 'gospodarze' => '1', 'komentarz' => 'Szykuje się zacięty pojedynek! (po-sześć-ynek?)'),
    array('goscie' => '3', 'gospodarze' => '2', 'komentarz' => 'Nie wiadomo czy spotkanie dojdzie do skutku - Januszowie mają problemy ze skompletowaniem składu... Tymczasem - przerwa na reklamę i sprawdzenie, jak wyświetlają się długie napisy we frontendzie!')
  );

  $squads = array(
    array('mecz' => '1', 'gospodarze' => array('2', '4', '3', '6', '8', '7'), 'goscie' => array('10', '11', '12', '13', '14', '15')),
    array('mecz' => '2', 'gospodarze' => array('10', '11', '12', '13', '14', '15'), 'goscie' => array('1', '2', '3', '6', '8', '7')),
    array('mecz' => '3', 'gospodarze' => array('13', '11', '12', '14', '10', '15'), 'goscie' => array('1', '2', '3', '6', '8', '7')),
    array('mecz' => '4', 'gospodarze' => array('1', '2', '6', '9', '4', '7'), 'goscie' => array('10', '11', '12', '13', '14', '15'))
  );

  function exe($a, $b, $c) {
    foreach ($b as $data) {
      $a[http][content] = json_encode($data);
      $context  = stream_context_create($a);
      // $result = file_get_contents($c, false, $context);
      if (!$result= file_get_contents($c, false, $context)) {
        $error = error_get_last();
        echo "Error at" . $a[http][content] . ": " . $error['message'] . "\n\n";
      } else 
        echo "Response from " . $a[http][content] . ": " . $result . "\n\n";
    }
  }

  $url = 'http://students.mimuw.edu.pl/~mb385130/bd/projekt2017/static/api/addTeam.php';
  exe($options, $teams, $url);

  $url = 'http://students.mimuw.edu.pl/~mb385130/bd/projekt2017/static/api/addPlayer.php';
  exe($options, $players, $url);

  $url = 'http://students.mimuw.edu.pl/~mb385130/bd/projekt2017/static/api/addMatch.php';
  exe($options, $matches, $url);

  $url = 'http://students.mimuw.edu.pl/~mb385130/bd/projekt2017/static/api/setSquad.php';
  exe($options, $squads, $url);
?>