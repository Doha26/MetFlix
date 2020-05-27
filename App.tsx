import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from '~/navigation/index';
import {Provider} from 'react-redux';
import store from '~/stores';

const App = () => (
  <Provider store={store}>
    <StatusBar/>
    <Navigator/>
  </Provider>
);

export default App;
