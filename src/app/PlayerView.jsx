import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { setter, objFilter, processMatches, makeTeamButton, fullName } from '../util';
import Detail from '../components/Detail';
import List from '../components/List';

const PlayerView = (props) => {
  const playerId = props.package.selPlayer;

  const { players } = props.package;
  const player = Object.assign({}, players[playerId]);

  const team = player.druzyna;
  if (team) {
    player.druzyna = makeTeamButton(props, team);
  }

  const comembers = objFilter(props.package.members, el => el.id !== player.id);

  return (
    <div>
      <h1>{fullName(player)}</h1>
      <h4>Szczegóły gracza: </h4>
      <Detail content={player} />
      <div className="button-bar-wrapper">
        <Button onClick={setter(props, 'PLAYERS')}>
          Wróć do wyboru graczy
        </Button>
      </div>
      <div className="horizontal-separator" />
      <div className="button-bar-wrapper">
        <div>
          <h3>Mecze:</h3>
          <List content={processMatches(props, props.package.playerGames)} setter={setter(props, 'MATCH_VIEW')} />
        </div>
        <div>
          <h3>Współczłonkowie:</h3>
          <List content={comembers} setter={setter(props, 'PLAYER_VIEW')} />
        </div>
      </div>
    </div>
  );
};

PlayerView.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    playerGames: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    selPlayer: PropTypes.string,
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
    fetchTeamGames: PropTypes.func,
    fetchPlayerGames: PropTypes.func,
  }).isRequired,
};

export default PlayerView;
