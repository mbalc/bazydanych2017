import React from 'react';
import request from 'superagent';

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

const defaultContent = [{ 'Proszę czekać': 'Pobieram dane...' }];

class app extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSite: 0,
      teams: [],
      players: [],
      fetchAll: () => {
        this.setState({
          teams: defaultContent,
          players: defaultContent,
        });

        request
          .get(API.GET_TEAMS)
          .accept('json')
          .then((res) => {
            this.setState({ teams: res.body });
          });
        request
          .get(API.GET_PLAYERS)
          .accept('json')
          .then((res) => {
            this.setState({ players: res.body });
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
