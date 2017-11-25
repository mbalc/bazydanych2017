import React from 'react';
import Main from '../components/MainApp';
import bootstrap from '../../css/bootstrap.min.css';
import bootstrapTheme from '../../css/bootstrap-theme.min.css';


export default () => (
  <div>

    <link rel="stylesheet" href={bootstrap} />
    <link rel="stylesheet" href={bootstrapTheme} />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react.min.js" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/<react-version>/react-dom.min.js" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-bootstrap/<version>/react-bootstrap.min.js" />
    <script>
      var Alert = ReactBootstrap.Alert;
    </script>
    <Main />

  </div>
);
