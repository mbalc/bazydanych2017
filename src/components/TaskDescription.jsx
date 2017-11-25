import React from 'react';
import { Panel } from 'react-bootstrap';

const label = 'Zadanie';

const content = (
  <div>
    <Panel header="Treść zadania">
      <iframe
        width="100%"
        height="240px"
        title="description"
        frameBorder="0"
        src="http://students.mimuw.edu.pl/~zbyszek/bazy-danych/inf/siatkowka.html"
      />
    </Panel>
  </div>
);

export default [label, content];

