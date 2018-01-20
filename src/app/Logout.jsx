import React from 'react';
import Subsite from '../subsite';

class Logout extends React.Component {
  componentWillMount() {
    this.props.package.changeStatus({
      activeSite: Subsite.LOGOUT,
      authenticated: false,
    });
  }
  render() {
    return "Wylogowano!";
  }
}

export default Logout;
