import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import { teamsExist, objMap, teamName, setter } from '../util';
import AddPlayer from '../components/modals/AddPlayer';

const process = (props) => {
  const { players } = props.package;
  const exampleElem = players[Object.keys(players)[0]];
  if (!exampleElem || !exampleElem.druzyna || !teamsExist(props)) return players;
  return objMap(players, (el) => {
    const out = Object.assign({}, el);
    out.druzyna = teamName(props, el.druzyna);
    return out;
  });
};

const PlayerList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="button-bar-wrapper">
      <div />
      <AddPlayer package={props.package} />
    </div>
  ) : (<div className="horizontal-separator" />);

  const content = process(props);

  return (
    <div>
      <h2>Wybierz gracza: </h2>
      {addButton}
      <List content={content} setter={setter(props, 'PLAYER_VIEW')} />
    </div>
  );
};

PlayerList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    players: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    authenticated: PropTypes.bool.isRequired,
    changeStatus: PropTypes.func,
    fetchMembers: PropTypes.func,
    fetchPlayerGames: PropTypes.func,
  }).isRequired,
};

export default PlayerList;
