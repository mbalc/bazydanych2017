import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import API from '../../apiPathConfig';
import { fullName, post, makeTeamButton, setter } from '../../util';
import ModalBase from './ModalBase';

const getTeams = (props) => {
  const { selMatch, matches, teams } = props.package;
  const match = matches[selMatch] || {};
  const [guest, host, id] = [match.goście, match.gospodarze, props.match || props.package.selMatch];
  return [teams, guest, host, id];
};

const clone = el => JSON.parse(JSON.stringify(el));

const range = [0, 1, 2, 3, 4, 5];

const tooSmall = (props) => {
  const [teams, guest, host] = getTeams(props);
  if (!teams[guest] || !teams[host]) return -1;
  if (teams[guest]['ilu członków'] < 6) return guest;
  if (teams[host]['ilu członków'] < 6) return host;
  return null;
};

const getMembers = (props) => {
  const [, guest, host, id] = getTeams(props);
  const { players } = props.package;
  return [
    Object.keys(players).filter(e => players[e].druzyna === guest),
    Object.keys(players).filter(e => players[e].druzyna === host),
    id,
  ];
};

const defaultState = (props) => {
  const [guests, hosts, id] = getMembers(props);
  if (!guests || !guests.length) return { goscie: [], gospodarze: [], mecz: id };
  return { goscie: guests.slice(0, 6), gospodarze: hosts.slice(0, 6), mecz: id };
};

class SetSquads extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field, id) {
    return (event) => {
      let val = event.target.value;

      this.setState((prevState) => {
        const obj = [...prevState[field]];
        const at = range.filter(el => obj[el] === val);
        if (at && at.length) {
          val = clone(obj[at]);
          obj[at] = clone(obj[id]);
        }
        obj[id] = clone(val);

        return ({ [field]: obj });
      });
    };
  }

  handleSubmit(id) {
    return () => {
      const exists = tooSmall(this.props);
      if (!exists) {
        post(API.SET_SQUADS, this, defaultState(this.props));
      } else {
        setter(this.props, 'TEAM_VIEW')(id);
      }
    };
  }

  render() {
    const exists = tooSmall(this.props);
    if (exists) {
      return (
        <ModalBase buttonLabel="Dodaj zawodnika" submit={this.handleSubmit(exists)}>
          Drużyna {makeTeamButton(this.props, exists)} ma za mało zawodników!
        </ModalBase>
      );
    }


    const [guests, hosts] = getMembers(this.props);
    console.log('guho', guests, hosts);

    const { teams, players } = this.props.package;

    const options = stuff => stuff.map((id) => {
      const pl = players[id];
      return (
        <option key={`player-option-${id}`} value={pl.id}>
          {id}. {fullName(pl)}
        </option>
      );
    });

    const getInputs = (field, stuff) => range.map(key => (
      <Input
        value={this.state[field][key]}
        onChange={this.handleChange(field, key)}
        type="select"
        name="select"
        key={`${field}-player-${key}`}
      >
        {options(stuff)}
      </Input>
    ));

    const [hostInputs, guestInputs] = [getInputs('gospodarze', hosts), getInputs('goscie', guests)];

    return (
      <ModalBase
        buttonLabel="Ustal składy"
        disabled={this.props.disabled}
        submit={this.handleSubmit(this.props.match || this.props.package.selMatch)}
      >
        <FormGroup>
          <Label>Gospodarze:</Label>
          {hostInputs}
        </FormGroup>
        <FormGroup>
          <Label>Goście:</Label>
          {guestInputs}
        </FormGroup>
      </ModalBase>
    );
  }
}

SetSquads.defaultProps = {
  match: null,
  disabled: false,
};


SetSquads.propTypes = {
  package: PropTypes.shape({
    teams: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    players: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
    changeStatus: PropTypes.func,
    fetchAll: PropTypes.func,
    selMatch: PropTypes.string,
  }).isRequired,
  match: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SetSquads;
