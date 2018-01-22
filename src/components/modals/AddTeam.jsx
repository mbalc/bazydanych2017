import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import ModalBase from './ModalBase';

const AddTeam = () => (
  <ModalBase buttonLabel="Dodaj drużynę" submit={() => console.log('submittin')}>
    <Form>
      <FormGroup>
        <Label>Nazwa:</Label>
        <Input />
      </FormGroup>

    </Form>
  </ModalBase>
);

export default AddTeam;
