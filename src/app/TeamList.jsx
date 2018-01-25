import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import AddTeam from '../components/modals/AddTeam';
import { setter } from '../util';


const TeamList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="button-bar-wrapper">
      <div />
      <div>
        <AddTeam package={props.package} />
      </div>
    </div>
  ) : (<div className="horizontal-separator" />);

  return (
    <div>
      <h2>Wybierz drużynę: </h2>
      {addButton}
      <List content={props.package.teams} setter={setter(props, 'TEAM_VIEW')} />
    </div>
  );
};

TeamList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
    fetchMembers: PropTypes.func,
    fetchTeamGames: PropTypes.func,
  }).isRequired,
};

export default TeamList;
