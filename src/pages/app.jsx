import React from 'react';
import Landing from '../app/Landing';
import Authed from '../app/Authed';
import Login from '../app/Login';
import Teams from '../app/TeamList';
import Logout from '../app/Logout';
import Sidebar from '../app/Sidebar';
import Subsite from '../subsite';
import '../../css/bootstrap.min.css';
import './app.css';

function findComponent(state) {
  switch (state) {
    case Subsite.TEAMS: return Teams;
    case Subsite.AUTHED: return Authed;
    case Subsite.LOGIN: return Login;
    case Subsite.LOGOUT: return Logout;
    case Subsite.LANDING:
    default: return Landing;
  }
}

class app extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSite: 0,
      authenticated: false,
      changeStatus: newState => this.setState(() => newState),
    };
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
