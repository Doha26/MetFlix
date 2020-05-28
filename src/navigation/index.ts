import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SplashScreen from '~/screens/splash';
import Home from '~/screens/Home';
import DetailScreen from '~/screens/Detail';

const navigator = createSwitchNavigator({
  home: Home,
  splash: SplashScreen,
  detail: DetailScreen,
}, {
  initialRouteName: 'detail', // Initial route
});

export default createAppContainer(navigator);
