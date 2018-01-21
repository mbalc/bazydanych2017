import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'reactstrap';
import './List.css';


class List extends React.Component {
  render() {
    const keys = this.props.content.length
      ? Object.keys(this.props.content[0]).filter(a => a !== 'id')
      : ['Brak wpisów!'];

    const temp = keys.map((el, i) => (<th key={`temKey-${i}`}>{el}</th>));
    const heads = [(<th>id</th>)].concat(temp);

    const content = this.props.content.map((el, i) => (
      <tr onClick={() => this.props.setter(el.id)} key={`teamRow-${i}`}>
        <th>{el.id}</th>
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
  setter: () => null,
};

List.propTypes = {
  content: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setter: PropTypes.func,
};

export default List;
