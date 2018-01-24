import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import request from 'axios';
import API from '../../apiPathConfig';
import Subsite from '../../subsite';
import ModalBase from './ModalBase';

class AddTeam extends React.Component {
  constructor(props) {
    super(props);

    let { team } = this.props;
    console.log('team len', !team, props.package.teams && Object.keys(props.package.teams).length > 0);
    if (!team) {
      if (props.package.teams && Object.keys(props.package.teams).length > 0) {
        [team] = Object.keys(props.package.teams);
      }
      // else team stays null <=> state is invalid for adding a player
    }

    this.state = {
      imie: '',
      nazwisko: '',
      druzyna: team,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (event) => {
      this.setState({ [field]: event.target.value });
    };
  }

  handleSubmit() {
    if (this.state.druzyna) {
      request.post(API.ADD_PLAYER, JSON.stringify(this.state))
        .then(() => {
          console.log('success');
          this.props.package.fetchAll();
        })
        .catch(e => console.error('submit error:', e));
    } else {
      this.props.package.changeStatus({ activeSite: Subsite.TEAMS });
    }
  }

  render() {
    if (!this.state.druzyna) {
      return (
        <ModalBase buttonLabel="Dodaj drużynę" submit={this.handleSubmit}>
          Aby móc dodać gracza musisz wpierw dodać jakąś drużynę!
        </ModalBase>
      );
    }

    const { teams } = this.props.package;

    const teamOptions = Object.keys(teams).map(key => (
      <option key={`team-option-${key}`} value={teams[key].id}>
        {teams[key].id}. {teams[key].nazwa}
      </option>
    ));

    const teamSelect = (
      <div>
        <Label>Drużyna:</Label>
        <Input value={this.state.druzyna} onChange={this.handleChange('druzyna')} type="select" name="select" id="exampleSelect">
          {teamOptions}
        </Input>
      </div>
    );
    const form = (
      <FormGroup>
        <Label>Imię:</Label>
        <Input value={this.state.imie} onChange={this.handleChange('imie')} />
        <Label>Nazwisko:</Label>
        <Input value={this.state.nazwisko} onChange={this.handleChange('nazwisko')} />
        {teamSelect}
      </FormGroup>
    );

    return (
      <ModalBase buttonLabel="Dodaj zawodnika" submit={this.handleSubmit}>
        {form}
      </ModalBase>
    );
  }
}

AddTeam.defaultProps = {
  team: null,
};


AddTeam.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    changeStatus: PropTypes.func,
    fetchAll: PropTypes.func,
  }).isRequired,
  team: PropTypes.number,
};

export default AddTeam;
