import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Loading from '~/screens/splash/index';

const nav = createSwitchNavigator({
  loading: Loading,
}, {
  initialRouteName: 'loading',
});

export default createAppContainer(nav);
