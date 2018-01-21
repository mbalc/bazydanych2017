import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import sqlCode from '!raw-loader!../../../public/static/deploy.sql';
import wrap from './Wrapper';
import './DeployScript.css';

const label = 'Skrypt SQL';
const content = (
  <div className="">
    <h2>Projekt bazy danych - skrypt SQL</h2>
    <SyntaxHighlighter className="script-container" language="sql" style={docco}>
      {sqlCode}
    </SyntaxHighlighter>
    <div className="db-deploy-footer">
      <a href="https://editor.ponyorm.com/user/mbalc/bd/postgres">Źródło</a>
      <p /><a href="static/deploy.sql">Plik SQL</a>
      <p />
      <small>
        Skrypt wygenerowany za pomocą <a href="https://editor.ponyorm.com">edytora Pony ORM</a>
      </small>
    </div>
  </div>
);
export default [label, wrap(content, 'deploy')];

