/* eslint-disable react/no-unused-state */
import React from 'react';
import request from 'axios';
import moment from 'moment';

import Landing from '../app/Landing';
import Authed from '../app/Authed';
import Login from '../app/Login';
import Matches from '../app/MatchList';
import MatchView from '../app/MatchView';
import Players from '../app/PlayerList';
import PlayerView from '../app/PlayerView';
import Teams from '../app/TeamList';
import TeamView from '../app/TeamView';
import Logout from '../app/Logout';
import Sidebar from '../app/Sidebar';

import API from '../apiPathConfig';
import Subsite from '../subsite';

import '../../css/bootstrap.min.css';
import './app.css';

function findComponent(state) {
  switch (state) {
    case Subsite.TEAMS: return Teams;
    case Subsite.PLAYERS: return Players;
    case Subsite.MATCHES: return Matches;
    case Subsite.AUTHED: return Authed;
    case Subsite.LOGIN: return Login;
    case Subsite.LOGOUT: return Logout;
    case Subsite.TEAM_VIEW: return TeamView;
    case Subsite.PLAYER_VIEW: return PlayerView;
    case Subsite.MATCH_VIEW: return MatchView;
    default: return Landing;
  }
}

const defaultContent = { 0: { 'Proszę czekać': 'Pobieram dane...' } };
const errorContent = (err) => {
  console.error(err);
  return {
    0: {
      'Wystąpił błąd': 'Możesz spróbować odwieżyć stronę',
      'Szczegóły błędu': `${err.toString()}\nWięcej szczegółów znajduje się w konsoli developera`,
    },
  };
};

const overSquad = (cb, el) => {
  const a = el || {};
  return ({
    goście: cb(a.goście),
    gospodarze: cb(a.gospodarze),
    sety: cb(a.sety),
  });
};

function reindex(array) {
  if (!array) return ({});
  return array.reduce((acc, val) => {
    if (val.id) acc[val.id] = val;
    else acc[0] = val;
    return acc;
  }, {});
}

const getMoment = date => moment(date).format('D MMM YYYY, HH:mm:ss');


class app extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAll = this.fetchAll.bind(this);
    this.fetchMembers = this.fetchMembers.bind(this);
    this.fetchSquads = this.fetchSquads.bind(this);
    this.fetchTeamGames = this.fetchTeamGames.bind(this);
    this.fetchPlayerGames = this.fetchPlayerGames.bind(this);

    this.state = {
      teams: {},
      players: {},
      matches: {},
      deadline: {},

      members: {},
      squads: overSquad(() => {}),
      teamGames: {},
      playerGames: {},

      lastUpdate: getMoment(Date.parse('Jan 01 1999 00:00:57 GMT+0100')),
      authenticated: false,

      activeSite: 0,
      selTeam: '-1',
      selPlayer: '-1',
      selMatch: '-1',

      fetchAll: this.fetchAll,
      fetchMembers: this.fetchMembers,
      fetchSquads: this.fetchSquads,
      fetchTeamGames: this.fetchTeamGames,
      fetchPlayerGames: this.fetchPlayerGames,
      changeStatus: newState => this.setState(() => newState),
    };
  }

  componentDidMount() {
    this.state.fetchAll();
  }

  getComponent() {
    const Elem = findComponent(this.state.activeSite);
    return <Elem package={this.state} />;
  }

  fetchAll() {
    this.fetchMembers();
    this.fetchSquads();
    this.fetchTeamGames();
    this.fetchPlayerGames();
    this.setState({
      teams: defaultContent,
      players: defaultContent,
      matches: defaultContent,
      deadline: getMoment(Date.now()),
      lastUpdate: getMoment(Date.now()),
    });


    this.makeRequest(API.GET_TEAMS, 'teams', reindex);
    this.makeRequest(API.GET_PLAYERS, 'players', reindex);
    this.makeRequest(API.GET_MATCHES, 'matches', reindex);
    this.makeRequest(API.GET_DEADLINE, 'deadline', e => e[0].termin);
  }

  fetchMembers(id) {
    this.setState({
      members: defaultContent,
    });
    this.makeRequest(API.GET_MEMBERS, 'members', reindex, { id: id || this.state.selTeam });
  }

  fetchTeamGames(id) {
    this.setState({
      teamGames: defaultContent,
    });
    this.makeRequest(API.GET_TEAM_GAMES, 'teamGames', reindex, { id: id || this.state.selTeam });
  }

  fetchPlayerGames(id) {
    this.setState({
      playerGames: defaultContent,
    });
    this.makeRequest(API.GET_PLAYER_GAMES, 'playerGames', reindex, { id: id || this.state.selPlayer });
  }

  fetchSquads(id) {
    console.log('fetc', overSquad(() => defaultContent));
    this.setState({
      squads: overSquad(() => defaultContent),
    });
    this.makeRequest(API.GET_SQUADS, 'squads', a => overSquad(reindex, a), { id: id || this.state.selMatch });
  }

  makeRequest(endpoint, storage, getter, data) {
    const method = data ? 'post' : 'get';
    request[method](endpoint, data)
      .then((res) => {
        console.log('res', getter(res.data));
        this.setState({ [storage]: getter(res.data) });
      })
      .catch((err) => {
        this.setState({ [storage]: errorContent(err), lastUpdate: err.toString() });
      });
  }


  render() {
    return (
      <div className="main-container">
        <div className="sidebar-nav">
          <Sidebar package={this.state} />
        </div>
        <div className="main-content">
          {this.getComponent()}
        </div>
      </div>
    );
  }
}

export default app;
