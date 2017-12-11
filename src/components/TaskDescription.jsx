import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import wrap from './Wrapper';
import './TaskDescription.css';

const label = 'Zadanie';

const content = (
  <div className="task-container">
    <h1>Treść zadania</h1>
    <Card>
      <CardBody>
        <CardText>
          <iframe
            style={{ fontFamily: '"Roboto", sans-serif' }}
            width="100%"
            height="340px"
            title="description"
            frameBorder="0"
            src="http://students.mimuw.edu.pl/~zbyszek/bazy-danych/inf/siatkowka.html"
          />
        </CardText>
      </CardBody>
    </Card>
  </div>
);

export default [label, wrap(content, 'taskdesc')];

