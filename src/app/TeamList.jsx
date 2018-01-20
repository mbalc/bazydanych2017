import React from 'react';
import { Button, Table } from 'reactstrap';
import API from '../apiPathConfig';
import './TeamList.css';

class TeamList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [{ 'Please wait': 'Fetching...' }],
    };
  }

  updateContent() {
    this.state;
    console.log('refresh');
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

export default TeamList;
