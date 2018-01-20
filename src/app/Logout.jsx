import React from 'react';
import PropTypes from 'prop-types';
import Subsite from '../subsite';

class Logout extends React.Component {
  componentWillMount() {
    this.props.package.changeStatus({
      activeSite: Subsite.LOGOUT,
      authenticated: false,
    });
  }
  render() {
    return 'Wylogowano!';
  }
}

Logout.propTypes = {
  package: PropTypes.shape({
    changeStatus: PropTypes.func,
  }).isRequired,
};

export default Logout;
