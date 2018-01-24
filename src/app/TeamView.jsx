import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Subsite from '../subsite';
import AddPlayer from '../components/modals/AddPlayer';
import Detail from '../components/Detail';
import List from '../components/List';

const TeamView = (props) => {
  const teamId = props.package.selTeam;
  const teamStuff = props.package.teams[teamId] || {};
  const teamName = teamStuff ? teamStuff.nazwa || (<small>Drużyna bez nazwy</small>) : null;

  const returnToTeams = () => props.package.changeStatus({
    activeSite: Subsite.TEAMS,
  });

  const addMatch = props.package.authenticated ? (
    <Button color="primary" onClick={returnToTeams}>
      Dodaj mecz
    </Button>
  ) : null;

  const addMember = props.package.authenticated ? (
    <AddPlayer package={props.package} team={teamId} />
  ) : null;

  const setter = (id) => {
    props.package.changeStatus({
      activeSite: Subsite.PLAYER_VIEW,
      selPlayer: id,
    });
  };

  return (
    <div>
      <h1>{teamName}</h1>
      <Detail content={teamStuff} />
      <div className="button-bar-wrapper">
        <Button onClick={returnToTeams}>
          Wróć do wyboru drużyny
        </Button>
        <div className="neighbour-buttons">
          {addMatch}
          {addMember}
        </div>
      </div>
      <div className="horizontal-separator" />
      <div className="button-bar-wrapper">
        <div>
          <h3>Mecze:</h3>
        </div>
        <div>
          <h3>Członkowie:</h3>
          <List content={props.package.members} setter={setter} />
        </div>
      </div>
    </div>
  );
};

TeamView.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    selTeam: PropTypes.string,
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
  }).isRequired,
};

export default TeamView;
