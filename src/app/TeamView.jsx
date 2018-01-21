import React from 'react';
import View from '../components/View';

export default () => (
  <div>
    <h2>Wybierz drużynę: </h2>
    <View details={{ id: 1, nazwa: 'niszczyciele' }} keys={['nazwa']} />
  </div>
);
