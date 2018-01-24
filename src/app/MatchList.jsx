import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import Subsite from '../subsite';
import { processMatches } from '../util';
import AddMatch from '../components/modals/AddMatch';

const MatchList = (props) => {
  const addButton = props.package.authenticated ? (
    <div className="button-bar-wrapper">
      <div />
      <AddMatch package={props.package} />
    </div>
  ) : (<div className="horizontal-separator" />);

  console.log(props.package.players);

  const setter = (id) => {
    props.package.changeStatus({
      activeSite: Subsite.MATCH_VIEW,
      selMatch: id,
    });
  };

  const matches = processMatches(props);

  console.log('mecz', props.package.matches);
  return (
    <div>
      <h2>Wybierz mecz: </h2>
      {addButton}
      <List content={matches} setter={setter} />
    </div>
  );
};

MatchList.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    players: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    matches: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    authenticated: PropTypes.bool.isRequired,
    changeStatus: PropTypes.func,
    fetchMembers: PropTypes.func,
  }).isRequired,
};

export default MatchList;
