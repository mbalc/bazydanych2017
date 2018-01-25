import React from 'react';
import PropTypes from 'prop-types';
import request from 'axios';
import { ButtonGroup, Button } from 'reactstrap';
import API from '../apiPathConfig';
import Subsite from '../subsite';
import { checkDeadline, setter } from '../util';
import './Sidebar.css';

const publics = [0, 1, 2, 3, 4];
const protecs = [0, 1, 2, 3, 5];

const sendApi = (path, props) => () => {
  request.get(path)
    .then(() => props.package.fetchAll())
    .catch(e => props.package.changeStatus({ lastUpdate: e.toString() }));
};

const reset = props => () => {
  sendApi(API.RESET, props)();
  setter(props, 'LANDING')();
};
const close = props => sendApi(API.CLOSE, props);
const insert = props => sendApi(API.INSERT, props);

const Sidebar = (props) => {
  const change = siteCode => () => props.package.changeStatus({ activeSite: siteCode });
  const buttons = Object.keys(Subsite).filter(el => el !== 'labels').map((key, i) => {
    let color = 'secondary';
    if (props.package.activeSite === Subsite[key]) color = 'primary';
    return (<Button color={color} key={`sidebar-nav-button-${i}`} onClick={change(Subsite[key])}>{Subsite.labels[i]}</Button>);
  });

  const access = props.package.authenticated ? protecs : publics;
  const list = access.map(elem => buttons[elem]);

  const { teams } = props.package;

  const organizationButtons = props.package.authenticated ? (
    <div>
      {teams && Object.keys(teams) && Object.keys(teams).length ?
        <Button onClick={reset(props)} color="danger" size="sm">
          Reset danych
        </Button> : null
      }
      <Button onClick={close(props)} disabled={checkDeadline(props)} color="warning" size="sm">
        Zamknij zgłoszenia
      </Button>
      <Button onClick={insert(props)} disabled={checkDeadline(props)} color="primary" size="sm">
        Dodaj przykładowe dane
      </Button>
    </div>
  ) : null;

  return (
    <div className="sidebar-wrapper">
      <a href="/">
        <img
          alt=""
          width="160px"
          className="volleyball-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Volley_ball_angelo_gelmi_01.svg/876px-Volley_ball_angelo_gelmi_01.svg.png"
        />
      </a>
      <ButtonGroup vertical>
        {list}
      </ButtonGroup>
      <div className="refresh-button-wrapper">
        <Button onClick={props.package.fetchAll} color="success" size="sm">
          Aktualizuj
        </Button>
        <br />
        {organizationButtons}
        Ostatnia aktualizacja:
        <br />
        {props.package.lastUpdate}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  package: PropTypes.shape({
    authenticated: PropTypes.bool,
    activeSite: PropTypes.number,
    changeStatus: PropTypes.func,
    fetchAll: PropTypes.func,
    lastUpdate: PropTypes.string,
  }).isRequired,
};

export default Sidebar;
