import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import API from '../../apiPathConfig';
import { teamsExist, post } from '../../util';
import Subsite from '../../subsite';
import ModalBase from './ModalBase';

const defaultState = ({
  gospodarze: '',
  goscie: '',
  komentarz: '',
});

const doTeams = (props) => {
  const team = defaultState;
  if (teamsExist(props, 2)) {
    const keys = Object.keys(props.package.teams);
    [team.gospodarze, team.goscie] = keys;
  }
  return team;
};

function rev(field) {
  if (field === 'goscie') return 'gospodarze';
  if (field === 'gospodarze') return 'goscie';
  return 'error';
}

class AddMatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = doTeams(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (event) => {
      const val = event.target.value;
      const obj = Object.assign(this.state);
      const old = obj[field];
      if (obj[rev(field)] === val) obj[rev(field)] = old;
      obj[field] = val;

      this.setState(obj);
    };
  }

  handleSubmit() {
    if (teamsExist(this.props, 2)) {
      post(API.ADD_MATCH, this, { komentarz: '' });
    } else {
      this.props.package.changeStatus({ activeSite: Subsite.TEAMS });
    }
  }

  render() {
    if (!teamsExist(this.props, 2)) {
      return (
        <ModalBase buttonLabel="Dodaj drużynę" submit={this.handleSubmit}>
          Aby móc dodać muszą istnieć przynajmniej dwie drużyny!
        </ModalBase>
      );
    }

    const { teams } = this.props.package;

    const options = Object.keys(teams).map(key => (
      <option key={`team-option-${key}`} value={teams[key].id}>
        {teams[key].id}. {teams[key].nazwa}
      </option>));

    const form = (
      <FormGroup>
        <Label>Gospodarze:</Label>
        <Input value={this.state.gospodarze} onChange={this.handleChange('gospodarze')} type="select" name="select">
          {options}
        </Input>
        <Label>Goście:</Label>
        <Input value={this.state.goscie} onChange={this.handleChange('goscie')} type="select" name="select">
          {options}
        </Input>
        <Label>Komentarz do meczu:</Label>
        <Input value={this.state.komentarz} onChange={this.handleChange('komentarz')} />
      </FormGroup>
    );

    return (
      <ModalBase
        buttonLabel="Dodaj mecz"
        submit={this.handleSubmit}
      >
        {form}
      </ModalBase>
    );
  }
}

AddMatch.defaultProps = {
  team: null,
};


AddMatch.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    changeStatus: PropTypes.func,
    fetchAll: PropTypes.func,
  }).isRequired,
  team: PropTypes.string,
};

export default AddMatch;
