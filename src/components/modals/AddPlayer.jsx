import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import API from '../../apiPathConfig';
import { checkDeadline, teamsExist, post, setter } from '../../util';
import ModalBase from './ModalBase';

const defaultState = ({
  imie: '',
  nazwisko: '',
});

const doTeam = (props) => {
  let { team } = props;
  if (!team) {
    if (teamsExist(props)) {
      [team] = Object.keys(props.package.teams);
    }
    // else team stays null <=> state is invalid for adding a player
  }
  return team;
};

class AddPlayer extends React.Component {
  constructor(props) {
    super(props);

    defaultState.druzyna = doTeam(props);
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
    if (teamsExist(this.props)) {
      post(API.ADD_PLAYER, this, defaultState);
    } else {
      setter(this.props, 'TEAMS')();
    }
  }

  render() {
    const closed = checkDeadline(this.props);
    if (!teamsExist(this.props)) {
      const label = closed ? 'Zamknięto zgłoszenia' : 'Dodaj drużynę';
      return (
        <ModalBase disabled={closed} buttonLabel={label} submit={this.handleSubmit}>
          Aby móc dodać gracza musisz wpierw dodać jakąś drużynę!
        </ModalBase>
      );
    }
    const label = closed ? 'Zamknięto zgłoszenia' : 'Dodaj zawodnika';

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
      <ModalBase
        disabled={closed}
        buttonLabel={label}
        submit={this.handleSubmit}
      >
        {form}
      </ModalBase>
    );
  }
}

AddPlayer.defaultProps = {
  team: null,
};


AddPlayer.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    changeStatus: PropTypes.func,
    fetchAll: PropTypes.func,
  }).isRequired,
  team: PropTypes.string,
};

export default AddPlayer;
