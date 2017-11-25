import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.contents);
    const mapper = (obj, Comp, index, type) => obj.map((val, i) => (
      <Comp eventKey={`navigator-event-${i}`} key={`navigator-${type}-${i}`}>
        {val[index]}
      </Comp>
    ));

    const switchers = mapper(this.props.contents, NavItem, 0, 'switcher');
    const pages = mapper(this.props.contents, Tab.Pane, 1, 'page');

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="clearfix">
          <Col sm={3}>
            <Nav bsStyle="pills" stacked>
              {switchers}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content animation>
              {pages}
            </Tab.Content>

          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

Navigator.defaultProps = {
  contents: [
    ['Tab1', 'Tab1 contents'],
    ['Tab2', 'Tab2 contents'],
  ],
};

Navigator.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)),
};

export default Navigator;
