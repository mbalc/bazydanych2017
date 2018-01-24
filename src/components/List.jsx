import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './List.css';

function stringToHtml(string) {
  if (!string) return string;
  return string.split('\n').map((item, key) => (
    <span key={key}>
      {item}
      <br />
    </span>
  ));
}

const List = (props) => {
  const input = props.content;
  const onClick = dx => () => props.setter(dx);
  const keys = Object.keys(input).length
    ? Object.keys(input[Object.keys(input)[0]]) // get value of the first key that exists
      .filter(a => a !== 'id')
    : ['Brak wpisów!'];

  const temp = keys.map((el, i) => (<th key={`listKey-${i}`}>{el}</th>));
  const heads = [(<th key="listKey-main-id">id</th>)].concat(temp);

  const content = Object.keys(input).map(dx => (
    <tr onClick={onClick(dx)} key={`listRow-${dx}`}>
      <th>{input[dx].id || null}</th>
      {keys.map((key, j) => (
        <td key={`listRow-${dx}-el-${j}`}>
          {stringToHtml(input[dx][key])}
        </td>))}
    </tr>
  ));

  return (
    <div className="list-container-wrapper">
      <div className="list-container">
        <Table hover responsive bordered size="sm" striped>
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
};

List.defaultProps = {
  setter: () => null,
};

List.propTypes = {
  content: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setter: PropTypes.func,
};

export default List;
