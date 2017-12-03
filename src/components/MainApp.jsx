import React from 'react';
import Navigator from './Navigator';
import Contents from './LandingContents';
import './MainApp.css';

export default () => (
  <Navigator className="main-app-content" contents={Contents} />
);
