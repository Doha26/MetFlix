import React from 'react';
import { StatusBar as RNStatusBar } from 'react-native';
import { withTheme } from '~/theming/index';

const StatusBar = ({ theme }: {theme: any}) => (
  <RNStatusBar
    backgroundColor={theme.background}
    barStyle={theme.key === 'dark' ? 'light-content' : 'dark-content'}
  />
);

export default withTheme(StatusBar);
