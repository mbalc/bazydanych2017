import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  submit() {
    this.toggle();
    this.props.submit();
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.buttonLabel}</ModalHeader>
          <Form onSubmit={(e) => { e.preventDefault(); this.submit(); console.warn(e.target); }}>
            <ModalBody>
              {this.props.children}
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" onClick={this.submit}>Dodaj</Button>{' '} */}
              <Button color="primary" type="submit">Dodaj</Button>{' '}

              <Button color="secondary" onClick={this.toggle}>Anuluj</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

ModalBase.defaultProps = {
  buttonLabel: 'Dodaj encję',
  className: 'modal-add-entity',
  children: null,
};

ModalBase.propTypes = {
  buttonLabel: PropTypes.string,
  className: PropTypes.string,
  submit: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ModalBase;
