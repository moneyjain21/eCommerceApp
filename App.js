/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import { Provider, observer } from 'mobx-react';
import Store from './src/stores/Store';
// import LoginStore from './src/stores/LoginStore';
// import Loader from './src/utility/Loader';
import AppContainer from './src/utility/Route';
import SplashScreen from 'react-native-splash-screen';

@observer
class App extends Component {
  componentDidMount() {
    SplashScreen.hide()
  }
  render() {
    return (
      <Provider {...Store}>
      {/* <Loader show={LoginStore.showLoader} /> */}
      <StatusBar barStyle="light-content" />
      <AppContainer />
      </Provider>
    )
  }

};

const styles = StyleSheet.create({

});

export default App;
