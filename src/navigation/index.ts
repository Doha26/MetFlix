import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SplashScreen from '~/screens/splash/index';
import Home from '~/screens/Home';

const navigator = createSwitchNavigator({
  home: Home,
  splash: SplashScreen,
}, {
  initialRouteName: 'splash', // Initial route
});

export default createAppContainer(navigator);
