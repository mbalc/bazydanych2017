import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { processMatches, teamLabel, setter } from '../util';
import AddPlayer from '../components/modals/AddPlayer';
import AddMatch from '../components/modals/AddMatch';
import Detail from '../components/Detail';
import List from '../components/List';

const TeamView = (props) => {
  const teamId = props.package.selTeam;
  const teamStuff = props.package.teams[teamId] || {};

  const addMatch = props.package.authenticated ? (
    <AddMatch package={props.package} team={teamId} color="primary" />
  ) : null;

  const addMember = props.package.authenticated ? (
    <AddPlayer package={props.package} team={teamId} />
  ) : null;

  return (
    <div>
      <h1>{teamLabel(props, teamId)}</h1>
      <h4>Szczegóły drużyny: </h4>
      <Detail content={teamStuff} />
      <div className="button-bar-wrapper">
        <Button onClick={setter(props, 'TEAMS')}>
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
          <List content={processMatches(props, props.package.teamGames)} setter={setter(props, 'MATCH_VIEW')} />
        </div>
        <div>
          <h3>Członkowie:</h3>
          <List content={props.package.members} setter={setter(props, 'PLAYER_VIEW')} />
        </div>
      </div>
    </div>
  );
};

TeamView.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    teamGames: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    selTeam: PropTypes.string,
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
  }).isRequired,
};

export default TeamView;
