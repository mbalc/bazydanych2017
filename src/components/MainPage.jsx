import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import wrap from './Wrapper';
import './MainPage.css';

const label = 'Strona główna';
const codeString = '(num) => num + 1';
const content = (
  <div className="main-page">
    Oto strona główna projektu
    <h1>Turniej siatkarski</h1>
    realizowanego w ramach przedmiotu
    <h1>Bazy Danych</h1>
    <SyntaxHighlighter language="sql" style={docco}>{codeString}</SyntaxHighlighter>

  </div>
);
export default [label, wrap(content, 'main-page')];

