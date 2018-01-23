/* eslint-disable react/no-unused-state */
import React from 'react';
import request from 'axios';
import moment from 'moment';

import Landing from '../app/Landing';
import Authed from '../app/Authed';
import Login from '../app/Login';
import Players from '../app/PlayerList';
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
    case Subsite.AUTHED: return Authed;
    case Subsite.LOGIN: return Login;
    case Subsite.LOGOUT: return Logout;
    case Subsite.TEAM_VIEW: return TeamView;
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

    this.state = {
      activeSite: 0,
      teams: {},
      players: {},
      lastUpdate: getMoment(Date.parse('Jan 01 1999 00:00:57 GMT+0100')),
      fetchAll: this.fetchAll,
      authenticated: false,
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
    this.setState({
      teams: defaultContent,
      players: defaultContent,
      lastUpdate: getMoment(Date.now()),
    });

    this.makeRequest(API.GET_TEAMS, 'teams');
    this.makeRequest(API.GET_PLAYERS, 'players');
  }

  makeRequest(endpoint, storage) {
    request
      .get(endpoint)
      .then((res) => {
        console.log('dex', reindex(res.data));
        this.setState({ [storage]: reindex(res.data) });
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
