import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { post } from '../../util';
import API from '../../apiPathConfig';
import ModalBase from './ModalBase';

const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
// too busy to install lodash, miss np.arange();

function rev(field) {
  if (field === 'goście') return 'gospodarze';
  if (field === 'gospodarze') return 'goście';
  return 'error';
}


const defaultState = props => ({
  goście: 0,
  gospodarze: 0,
  mecz: props.match,
});

class AddTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (event) => {
      this.setState({ [field]: event.target.value });
    };
  }

  handleSubmit() {
    post(API.SET_POINTS, this, defaultState(this.props));
  }

  render() {
    const options = (pal) => {
      const riv = this.state[rev(pal)];
      return range
        .filter(el => (riv === 21 || riv === '21' ? el !== 21 && el !== '21' : true))
        .map(id => (
          <option key={`points-${pal}-${id}`} value={id}>
            {id}
          </option>
        ));
    };

    const makeInput = pal => (
      <Input
        value={this.state[pal]}
        onChange={this.handleChange(pal)}
        type="select"
        name="select"
        key={`points-select-${pal}`}
      >
        {options(pal)}
      </Input>);

    return (
      <ModalBase
        buttonLabel="Ustaw wynik ostatniego seta"
        submit={this.handleSubmit}
      >
        <FormGroup>
          <Label>Punkty gospodarzy:</Label>
          {makeInput('gospodarze')}
        </FormGroup>
        <FormGroup>
          <Label>Punkty gości:</Label>
          {makeInput('goście')}
        </FormGroup>
      </ModalBase>
    );
  }
}


AddTeam.propTypes = {
  package: PropTypes.shape({
    fetchAll: PropTypes.func,
  }).isRequired,
  match: PropTypes.string.isRequired,
};

export default AddTeam;
