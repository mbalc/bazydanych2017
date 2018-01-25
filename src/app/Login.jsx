import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import Subsite from '../subsite';
import { password } from '../util';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    if (this.state.pass === password) {
      this.props.package.changeStatus({
        activeSite: Subsite.AUTHED,
        authenticated: true,
      });
    } else { this.setState({ pass: '' }); }
  }

  handleChange(event) {
    const val = event.target.value;
    this.setState({ pass: val });
  }

  render() {
    return (
      <div>
        <Input placeholder="Hasło:" value={this.state.pass} onChange={this.handleChange} />
        <Button
          color="warning"
          onClick={this.submit}
        >
        Kliknij, aby zalogować
        </Button>
        <p />Hasło to {`'${password}'`}
      </div>

    );
  }
}

Login.propTypes = {
  package: PropTypes.shape({
    changeStatus: PropTypes.func,
  }).isRequired,
};

export default Login;
