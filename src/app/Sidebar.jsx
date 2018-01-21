import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'reactstrap';
import Subsite from '../subsite';
import './Sidebar.css';

const Sidebar = (props) => {
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

    </div>
  );
};

Sidebar.propTypes = {
  package: PropTypes.shape({
    authenticated: PropTypes.bool,
    activeSite: PropTypes.number,
  }).isRequired,
};

export default Sidebar;
