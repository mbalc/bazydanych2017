import React from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';
import { Button, Table } from 'reactstrap';
import './List.css';

const defaultContent = [{ 'Please wait': 'Fetching...' }];

class List extends React.Component {
  constructor(props) {
    super(props);
    this.updateContent = this.updateContent.bind(this);

    this.state = {
      content: defaultContent,
    };
  }

  componentWillMount() {
    this.updateContent();
  }

  updateContent() {
    this.setState({ content: defaultContent });
    request[this.props.requestMethod](this.props.requestDestination)
      .accept('json')
      .then((res) => {
        console.log(res);
        this.setState({ content: res.body });
      })
      .catch(e => console.error(e));
  }

  render() {
    const keys = this.state.content.length ? Object.keys(this.state.content[0]) : ['Brak wpisów!'];
    const heads = keys.map((el, i) => (<th key={`temKey-${i}`}>{el}</th>));
    const content = this.state.content.map((el, i) => (
      <tr key={`teamRow-${i}`}>
        {keys.map((key, j) => (<td key={`teamRow-${i}-el-${j}`}>{el[key]}</td>))}
      </tr>
    ));

    return (
      <div className="list-container-wrapper">
        <div className="refresh-button-wrapper">
          <Button onClick={this.updateContent} color="success" size="sm">
            Odśwież
          </Button>
        </div>
        <div className="list-container">
          <Table hover responsive bordered size="sm">
            <thead>
              <tr>
                {heads}
              </tr>
            </thead>
            <tbody>
              {content}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

List.defaultProps = {
  details: { 'Please wait:': 'Fetching...' },
  keys: [],
};

List.propTypes = {
  details: PropTypes.objectOf(PropTypes.string),
  keys: PropTypes.arrayOf(PropTypes.string),
};

export default List;
