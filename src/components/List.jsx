import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './List.css';

function stringToHtml(string) {
  if (!string || !string.split) return string;
  return string.split('\n').map((item, key) => (
    <span key={key}>
      {item}
      <br />
    </span>
  ));
}

const List = (props) => {
  const input = props.content;
  const exists = input && Object.keys(input) && Object.keys(input).length;

  const allKeys = exists
    ? Object.keys(input[Object.keys(input)[0]]) // get value of the first key that exists
    : [];

  const keys = exists
    ? allKeys.filter(a => a !== 'id')
    : ['Brak wpisów!'];

  const temp = keys.map((el, i) => (<th key={`listKey-${i}`}>{el}</th>));

  const hasId = allKeys.includes('id');

  const idHead = hasId ? [(<th scope="col" key="listKey-main-id">id</th>)] : [];
  const first = dx => (hasId ? <th scope="row">{input[dx].id || null}</th> : null);

  const heads = idHead.concat(temp);

  const onClick = dx => () => (hasId ? props.setter(dx) : null);

  const content = exists ? Object.keys(input).map(dx => (
    <tr onClick={onClick(dx)} key={`listRow-${dx}`}>
      {first(dx)}
      {keys.map((key, j) => (
        <td key={`listRow-${dx}-el-${j}`}>
          {stringToHtml(input[dx][key])}
        </td>))
      }
    </tr>
  )) : [];

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
  content: PropTypes.objectOf(PropTypes.objectOf(PropTypes.node)).isRequired,
  setter: PropTypes.func,
};

export default List;
