import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import request from 'axios';
import { checkDeadline } from '../../util';
import API from '../../apiPathConfig';
import ModalBase from './ModalBase';

const defaultState = {
  nazwa: '',
};

class AddTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (event) => {
      this.setState({ [field]: event.target.value });
    };
  }

  handleSubmit() {
    request.post(API.ADD_TEAM, JSON.stringify(this.state))
      .then(() => {
        console.log('success');
        this.setState(defaultState);
        this.props.package.fetchAll();
      })
      .catch(e => console.error('submit error:', e));
  }

  render() {
    const closed = checkDeadline(this.props);
    const label = closed ? 'Zamknięto zgłoszenia' : 'Dodaj drużynę';
    return (
      <ModalBase
        disabled={closed}
        buttonLabel={label}
        submit={this.handleSubmit}
      >
        <FormGroup>
          <Label>Nazwa:</Label>
          <Input value={this.state.nazwa} onChange={this.handleChange('nazwa')} />
        </FormGroup>
      </ModalBase>
    );
  }
}


AddTeam.propTypes = {
  package: PropTypes.shape({
    fetchAll: PropTypes.func,
  }).isRequired,
};

export default AddTeam;
