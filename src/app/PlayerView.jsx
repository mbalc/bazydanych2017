import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Subsite from '../subsite';
import { objFilter, processMatches, teamName } from '../util';
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
    props.package.fetchTeamGames();
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
      <Button className="btn btn-link my-btn-link" onClick={switchToTeam}>
        {teamName(props, team)}
      </Button>);
  }

  const name = player.imie ? player.imie : null;
  const surname = player.nazwisko ? player.nazwisko : null;

  let fullName;
  if (name && surname) fullName = `${name} ${surname}`;
  else if (name || surname) fullName = name || surname;
  else fullName = <small>Bezimienny zawodnik</small>;

  const comembers = objFilter(props.package.members, el => el.id !== player.id);

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
          <List content={processMatches(props, props.package.teamGames)} />
        </div>
        <div>
          <h3>Współczłonkowie:</h3>
          <List content={comembers} setter={setter} />
        </div>
      </div>
    </div>
  );
};

PlayerView.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    teamGames: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    selPlayer: PropTypes.string,
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
    fetchTeamGames: PropTypes.func,
  }).isRequired,
};

export default PlayerView;
