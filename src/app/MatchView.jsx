import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { teamName, teamLabel, setter } from '../util';
import Detail from '../components/Detail';
import List from '../components/List';

const MatchView = (props) => {
  const matchId = props.package.selMatch;
  const { matches } = props.package;

  const match = Object.assign({}, matches[matchId]);

  const makeTeamButton = id => (
    <Button className="btn btn-link my-btn-link" onClick={setter(props, 'TEAM_VIEW')}>
      {teamName(props, id)}
    </Button>);

  const matchWithLinks = {};
  matchWithLinks.gospodarze = makeTeamButton(match.gospodarze);
  matchWithLinks.goście = makeTeamButton(match.goście);

  Object.keys(match)
    .filter(el => el !== 'goście' && el !== 'gospodarze')
    .forEach((key) => { matchWithLinks[key] = match[key]; });

  const head = <div>{teamLabel(props, match.gospodarze)} vs. {teamLabel(props, match.goście)}</div>;
  const score = <small>{`${match['wynik gospodarzy']} : ${match['wynik gości']}`}</small>;


  return (
    <div>
      <h1>{head}</h1>
      <h1>{score}</h1>
      <h4>Szczegóły meczu: </h4>
      <Detail content={matchWithLinks} />
      <div className="button-bar-wrapper">
        <Button onClick={setter(props, 'MATCHES')}>
          Wróć do wyboru meczy
        </Button>
      </div>
      <div className="horizontal-separator" />
      <div className="button-bar-wrapper">
        <div />
        <div>
          <h3>Sety:</h3>
          <List content={props.package.squads.sety} />
        </div>
        <div />
      </div>
      <div className="button-bar-wrapper">
        <div>
          <h3>Gospodarze:</h3>
          <List content={props.package.squads.gospodarze} setter={setter(props, 'PLAYER_VIEW')} />
        </div>
        <div>
          <h3>Goście:</h3>
          <List content={props.package.squads.goście} setter={setter(props, 'PLAYER_VIEW')} />
        </div>
      </div>
    </div>
  );
};

MatchView.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    members: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    squads: PropTypes.shape({
      goście: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
      gospodarze: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
      sety: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    }),
    playerGames: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    selMatch: PropTypes.string,
    authenticated: PropTypes.bool,
    changeStatus: PropTypes.func,
    fetchTeamGames: PropTypes.func,
    fetchPlayerGames: PropTypes.func,
  }).isRequired,
};

export default MatchView;
