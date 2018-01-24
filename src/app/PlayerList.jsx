import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import Subsite from '../subsite';
import { teamsExist } from '../util';
import AddPlayer from '../components/modals/AddPlayer';

const process = (pack, props) => {
  const { players, teams } = props.package;
  const exampleElem = players[Object.keys(players)[0]];
  if (!exampleElem || !exampleElem.druzyna || !teamsExist(props)) return players;
  const out = {};
  Object.keys(players).forEach((key) => {
    out[key] = Object.assign({}, players[key]); // copy
    const teamId = players[key].druzyna;
    out[key].druzyna = `${teamId}. ${teams[teamId].nazwa}`;
  });
  return out;
};

const PlayerList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="button-bar-wrapper">
      <div />
      <AddPlayer package={props.package} />
    </div>
  ) : (<div className="horizontal-separator" />);

  console.log(props.package.players);
  const content = process(props.package.players, props);

  const setter = (id) => {
    const teamId = props.package.players[id].druzyna;
    props.package.changeStatus({
      activeSite: Subsite.PLAYER_VIEW,
      selPlayer: id,
      selTeam: teamId,
    });
    props.package.fetchMembers(teamId);
  };

  return (
    <div>
      <h2>Wybierz gracza: </h2>
      {addButton}
      <List content={content} setter={setter} />
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
  }).isRequired,
};

export default PlayerList;
