import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import wrap from './Wrapper';
import './TaskDescription.css';

const label = 'Zadanie';

const content = (
  <div className="task-container">
    <Card>
      <CardHeader>Treść zadania</CardHeader>
      <CardBody>
        <CardText>
          <iframe
            style={{ fontFamily: '"Roboto", sans-serif' }}
            width="100%"
            height="240px"
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

