import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import AddPlayer from '../components/modals/AddPlayer';


const TeamList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="form-modal-wrapper">
      <AddPlayer package={props.package} />
    </div>
  ) : (<div className="horizontal-separator" />);

  return (
    <div>
      <h2>Wybierz gracza: </h2>
      {addButton}
      <List content={props.package.players} setter={id => console.log('to dest', id)} />
    </div>
  );
};

TeamList.propTypes = {
  package: PropTypes.shape({
    players: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TeamList;
