import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Subsite from '../subsite';

const Login = props => (
  <div>
    <Button
      color="warning"
      onClick={() => props.package.changeStatus({
        activeSite: Subsite.AUTHED,
        authenticated: true,
      })}
    >
      Kliknij, aby zalogować
    </Button>
  </div>
);

Login.propTypes = {
  package: PropTypes.shape({
    changeStatus: PropTypes.func,
  }).isRequired,
};

export default Login;
