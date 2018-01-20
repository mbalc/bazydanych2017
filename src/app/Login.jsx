import React from 'react';
import { Button } from 'reactstrap';
import Subsite from '../subsite';

export default props => (
  <div>
    <Button
      color="warning"
      onClick={() => props.package.changeStatus({
        activeSite: Subsite.AUTHED,
        authenticated: true,
      })}
    >
      Kliknij, aby zalogować
    </Button>
  </div>
);
