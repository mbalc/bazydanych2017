import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, NavLink } from 'reactstrap';
import './Navigator.css';

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.collapse = this.collapse.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  collapse() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const defaultView = (
      <div className="content-page-wrapper" id="main">
        <div className="content-page">
          Oto strona główna projektu Turniej siatkarski realizowanego w ramach przedmiotu Bazy Danych
        </div>
      </div>);

    const switchers = this.props.contents.map((val, i) => (
      <NavItem href="/google.com" key={`switcher no ${i}`}>
        txt
      </NavItem>
    ));

    const pages = [defaultView];
    pages.push(this.props.contents.map((val, i) => (
      <div key={`page no ${i}`} className="content-page-wrapper" id={`page${i}`}>
        <div className="content-page">
          {val[1]}
        </div>
      </div>
    )));

    return (
      <div className="main">
        <div className="menu-navigator">
          <Navbar color="dark" dark expand="md">
            <NavbarBrand onClick={this.collapse} href="#main">Bazy danych</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink onClick={this.collapse} href="#page0">Zadanie</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={this.collapse} href="#page1">Diagram encji</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div className="contents-main-wrapper">
          <div className="contents-main">
            {pages}
          </div>
        </div>
      </div>
    );

    // return (
    //   <Tab.Container id="left-tabs-example" defaultActiveKey="navigator-event-first">
    //     <Row className="clearfix">
    //       <Col sm={3}>
    //         <Nav bsStyle="pills" stacked>
    //           {switchers}
    //         </Nav>
    //       </Col>
    //       <Col sm={9}>
    //         <Tab.Content animation>
    //           {pages}
    //         </Tab.Content>

    //       </Col>
    //     </Row>
    //   </Tab.Container>
    // );
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
