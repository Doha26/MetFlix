import {createAppContainer} from 'react-navigation';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import SplashScreen from '~/screens/splash';
import Home from '~/screens/Home';
import DetailScreen from '~/screens/Detail';


const navigator = createSharedElementStackNavigator({
    home: Home,
    splash: SplashScreen,
    detail: DetailScreen,
}, {
    initialRouteName: 'home', // Initial route,
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: () => ({
        header: null,

    }),
});

export default createAppContainer(navigator);
