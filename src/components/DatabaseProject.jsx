import React from 'react';
import ERD from '../../resources/bd.svg';

const label = 'Baza danych';
const content = (
  <div>
    <p />Szczegóły
    <p /><img src={ERD} width="100%" height="100%" alt="Diagram bazy" />
    <p /><a href="https://editor.ponyorm.com/user/mbalc/bd/designer">Źródło</a>
    <p />
    <small>
      Stworzone przy użyciu <a href="https://editor.ponyorm.com">edytora Pony ORM</a>
    </small>
  </div>
);
export default [label, content];

