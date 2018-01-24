import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import AddPlayer from '../components/modals/AddPlayer';

const process = (pack, teams) => {
  const exampleElem = pack[Object.keys(pack)[0]];
  if (!exampleElem || !exampleElem.druzyna) return pack;
  const out = {};
  Object.keys(pack).forEach((key) => {
    out[key] = Object.assign({}, pack[key]); // copy
    const teamId = pack[key].druzyna;
    out[key].druzyna = `${teamId}. ${teams[teamId].nazwa}`;
  });
  return out;
};

const PlayerList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="form-modal-wrapper">
      <AddPlayer package={props.package} />
    </div>
  ) : (<div className="horizontal-separator" />);

  console.log(props.package.players);
  const content = process(props.package.players, props.package.teams);

  return (
    <div>
      <h2>Wybierz gracza: </h2>
      {addButton}
      <List content={content} setter={id => console.log('to dest', id)} />
    </div>
  );
};

PlayerList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    players: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PlayerList;
