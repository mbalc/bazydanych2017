import React from 'react';
import request from 'axios';
import moment from 'moment';

import Landing from '../app/Landing';
import Authed from '../app/Authed';
import Login from '../app/Login';
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
  return array.reduce((acc, val) => {
    if (val.id) acc[0] = val;
    else acc[0] = val;
    return acc;
  }, {});
}

class app extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSite: 0,
      teams: {},
      players: {},
      lastUpdate: moment(Date.parse('Mon Jan 22 2018 14:50:57 GMT+0100')),
      fetchAll: () => {
        this.setState({
          teams: defaultContent,
          players: defaultContent,
          lastUpdate: moment(Date.now()),
        });

        request
          .get(API.GET_TEAMS)
          .then((res) => {
            this.setState({ teams: reindex(res.data) });
          })
          .catch((err) => {
            this.setState({ teams: errorContent(err) });
          });
        request
          .get(API.GET_PLAYERS)
          .then((res) => {
            this.setState({ players: reindex(res.data) });
          })
          .catch((err) => {
            this.setState({ players: errorContent(err) });
          });
      },
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
