import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import AddTeam from '../components/modals/AddTeam';


const TeamList = props => (
  <div>
    <h2>Wybierz drużynę: </h2>
    <div className="form-modal-wrapper">
      <AddTeam />
    </div>
    <List content={props.package.teams} setter={id => console.log('to dest', id)} />
  </div>
);

TeamList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

export default TeamList;
