import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';

const TeamList = props => (
  <div>
    <h2>Wybierz drużynę: </h2>
    <List content={props.package.teams} setter={id => console.log('to dest', id)} />
  </div>
);

TeamList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

export default TeamList;
