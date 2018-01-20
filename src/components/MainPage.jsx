import React from 'react';
import { Button } from 'reactstrap';
import wrap from './Wrapper';
import './MainPage.css';

const label = 'Strona główna';
const sourceLink = (
  <a href="https://github.com/mbalc/bazydanych2017">
    <Button color="primary" size="lg">
      Kod źródłowy
    </Button>
  </a>
);
const entryLink = (
  <a href="app">
    <Button color="danger" size="lg">
      Link do aplikacji
    </Button>
  </a>
);

const content = (
  <div className="main-page">
    Oto strona główna projektu
    <h1>Turniej siatkarski</h1>
    realizowanego w ramach przedmiotu
    <h1>Bazy Danych</h1>
    <h1>{entryLink} {sourceLink}</h1>
  </div>
);
export default [label, wrap(content, 'main-page-default')];

