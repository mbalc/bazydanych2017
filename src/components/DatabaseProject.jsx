import React from 'react';
import ERD from '../../resources/bd.svg';
import './DatabaseProject.css';

const label = 'Projekt bazy';
const content = (
  <div className="db-design">
    <div><h2>Szczegóły</h2></div>
    <div className="erd-diagram-wrapper">
      <img className="erd-diagram" src={ERD} alt="Diagram bazy" />
    </div>
    <div className="db-design-footer">
      <p /><a href="https://editor.ponyorm.com/user/mbalc/bd/designer">Źródło</a>
      <p />
      <small>
        Stworzone przy użyciu <a href="https://editor.ponyorm.com">edytora Pony ORM</a>
      </small>
    </div>
  </div>
);
export default [label, content];

