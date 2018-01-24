import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Subsite from '../subsite';
import Detail from '../components/Detail';
import List from '../components/List';

const PlayerView = (props) => {
  const playerId = props.package.selPlayer;
  const returnToPlayers = () => props.package.changeStatus({
    activeSite: Subsite.PLAYERS,
  });

  const { players } = props.package;
  const player = Object.assign({}, players[playerId]);

  const switchToTeam = () => {
    props.package.changeStatus({
      activeSite: Subsite.TEAM_VIEW,
    });
  };

  const setter = (id) => {
    props.package.changeStatus({
      activeSite: Subsite.PLAYER_VIEW,
      selPlayer: id,
    });
  };

  const team = player.druzyna;
  if (team) {
    player.druzyna = (
      <Button outline size="sm" color="primary" onClick={switchToTeam}>
        {`${team}. ${props.package.teams[team].nazwa}`}
      </Button>);
  }

  const name = player.imie ? player.imie : null;
  const surname = player.nazwisko ? player.nazwisko : null;

  let fullName;
  if (name && surname) fullName = `${name} ${surname}`;
  else if (name || surname) fullName = name || surname;
  else fullName = <small>Bezimienny zawodnik</small>;

  return (
    <div>
      <h1>{fullName}</h1>
      <Detail content={player} />
      <div className="button-bar-wrapper">
        <Button onClick={returnToPlayers}>
          Wróć do wyboru graczy
        </Button>
      </div>
      <div className="horizontal-separator" />
      <div className="button-bar-wrapper">
        <div>
          <h3>Mecze:</h3>
        </div>
        <div>
          <h3>Współczłonkowie:</h3>
          <List content={props.package.members} setter={setter} />
        </div>
      </div>
    </div>
  );
};

PlayerView.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    selPlayer: PropTypes.string,
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
  }).isRequired,
};

export default PlayerView;
