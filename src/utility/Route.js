// import { Easing, Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screen/Login';
import Register from '../screen/Register';
import HomePage from '../screen/HomePage';
import TabviewExample from '../screen/TabviewExample';

const RootNavigator = createStackNavigator(
    {
        homepage: {screen: HomePage},
        Login: {screen: Login},
        Register: {screen: Register},
        TabviewExample: {screen: TabviewExample},
    },
    {
        initialRouteName: 'homepage',
    });

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;