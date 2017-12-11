import React from 'react';
import wrap from './Wrapper';
import './MainPage.css';

const label = 'Strona główna';
const content = (
  <div className="main-page">
    Oto strona główna projektu
    <h1>Turniej siatkarski</h1>
    realizowanego w ramach przedmiotu
    <h1>Bazy Danych</h1>
  </div>
);
export default [label, wrap(content, 'main-page-default')];

