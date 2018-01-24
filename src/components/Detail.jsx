import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './Detail.css';

const Detail = (props) => {
  const input = props.content;

  const content = Object.keys(input).map((dx, i) => (
    <tr key={`detailRow-${i}`}>
      <th key={`detailKey-${dx}`} className="align-right" scope="row">
        {dx}:
      </th>
      <td key={`detailValue-${dx}`}>
        {(input[dx])}
      </td>
    </tr>));

  return (
    <div className="list-container-wrapper">
      <div className="list-container">
        <Table responsive bordered size="sm">
          <tbody>
            {content}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

Detail.defaultProps = {
};

Detail.propTypes = {
  content: PropTypes.objectOf(PropTypes.node).isRequired,
};

export default Detail;
