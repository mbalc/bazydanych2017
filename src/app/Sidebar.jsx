import React from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import Subsite from '../subsite';

export default (props) => {
  const change = siteCode => () => props.package.changeStatus({ activeSite: siteCode });
  const loginStatus = props.package.authenticated ? 5 : 4;
  const labels = ['Start', 'Drużyny', 'Gracze', 'Mecze', 'Zaloguj', 'Wyloguj'];
  const buttons = Object.keys(Subsite).map((key, i) => {
    let color = 'secondary';
    if (props.package.activeSite === Subsite[key]) color = 'primary';
    return (<Button color={color} key={`sidebar-nav-button-${i}`} onClick={change(Subsite[key])}>{labels[i]}</Button>);
  });
  const list = buttons.slice(0, 3);
  list.push(buttons[loginStatus]);

  return (
    <ButtonGroup vertical>
      {list}
    </ButtonGroup>
  );
};
