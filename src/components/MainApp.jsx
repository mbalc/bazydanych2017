import React from 'react';
import { Panel, PageHeader } from 'react-bootstrap';
import Navigator from './Navigator';
import Contents from './LandingContents';

export default () => (
  <Panel>
    <PageHeader>
      Projekt zaliczeniowy <small> Bazy danych - turniej siatkarski </small>
    </PageHeader>
    <Navigator contents={Contents} />
  </Panel>
);
