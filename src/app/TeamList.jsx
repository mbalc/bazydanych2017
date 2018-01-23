import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import AddTeam from '../components/modals/AddTeam';


const TeamList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="form-modal-wrapper">
      <AddTeam package={props.package} />
    </div>
  ) : (<div className="horizontal-separator" />);

  return (
    <div>
      <h2>Wybierz drużynę: </h2>
      {addButton}
      <List content={props.package.teams} setter={id => console.log('to dest', id)} />
    </div>
  );
};

TeamList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TeamList;
