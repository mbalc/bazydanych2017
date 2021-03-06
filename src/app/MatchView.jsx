import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { teamLabel, setter, makeTeamButton, post } from '../util';
import API from '../apiPathConfig';
import Detail from '../components/Detail';
import List from '../components/List';
import SetSquads from '../components/modals/SetSquads';
import SetPoints from '../components/modals/SetPoints';

const MatchView = (props) => {
  const matchId = props.package.selMatch;
  const { matches } = props.package;

  const match = Object.assign({}, matches[matchId]);

  const matchWithLinks = {};
  matchWithLinks.gospodarze = makeTeamButton(props, match.gospodarze);
  matchWithLinks.goście = makeTeamButton(props, match.goście);

  Object.keys(match)
    .filter(el => el !== 'goście' && el !== 'gospodarze')
    .forEach((key) => { matchWithLinks[key] = match[key]; });

  const head = <div>{teamLabel(props, match.gospodarze)} vs. {teamLabel(props, match.goście)}</div>;
  const score = <small>{`${match['wynik gospodarzy']} : ${match['wynik gości']}`}</small>;

  const editable = !Object.keys(props.package.squads.sety).length;

  const addSet = (
    <Button
      outline
      disabled={match.status === 'w trakcie' || match.status === 'zakończony'}
      color="danger"
      onClick={() => post(API.ADD_SET, {
        state: { mecz: matchId },
        props,
      })}
    >
      {editable ? 'Odpal mecz!' : 'Dodaj seta'}
    </Button>
  );


  return (
    <div>
      <h1>{head}</h1>
      <h4>Szczegóły meczu: </h4>
      <Detail content={matchWithLinks} />
      <div className="button-bar-wrapper">
        <Button onClick={setter(props, 'MATCHES')}>
          Wróć do wyboru meczy
        </Button>
        {props.package.authenticated ? (
          <div className="neighbour-buttons">
            {addSet}
            <SetSquads disabled={!editable} package={props.package} match={matchId} />
          </div>) : null}
      </div>
      <div className="horizontal-separator" />
      <h1>{score}</h1>
      <div className="button-bar-wrapper">
        <div />
        <div>
          <h3>Sety:</h3>
          <List content={props.package.squads.sety} />
        </div>
        <div />
      </div>
      {props.package.authenticated ? (
        <div className="button-bar-wrapper">
          <div />
          <SetPoints package={props.package} match={matchId} />
          <div />
        </div>) : null}
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
