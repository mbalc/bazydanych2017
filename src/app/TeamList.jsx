import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import AddTeam from '../components/modals/AddTeam';
import Subsite from '../subsite';


const TeamList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="button-bar-wrapper">
      <div />
      <div>
        <AddTeam package={props.package} />
      </div>
    </div>
  ) : (<div className="horizontal-separator" />);

  const setter = id => props.package.changeStatus({
    activeSite: Subsite.TEAM_VIEW,
    selTeam: id,
  });

  return (
    <div>
      <h2>Wybierz drużynę: </h2>
      {addButton}
      <List content={props.package.teams} setter={setter} />
    </div>
  );
};

TeamList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
  }).isRequired,
};

export default TeamList;
