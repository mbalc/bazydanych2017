import React from 'react';
import './Wrapper.css';

export default (content, proj) => (
  <div className={proj}>
    <div className="background" />
    <div className="content-page">
      {content}
    </div>
  </div>);
