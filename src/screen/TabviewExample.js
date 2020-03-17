import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, TouchableOpacity, Image} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AsyncStorage from '@react-native-community/async-storage'
import { observer, inject } from 'mobx-react';
import Home from './TabBarScreen/Home';
import Product from './TabBarScreen/Product';
import Contact from './TabBarScreen/Contact';

const HomeRoute = () => <Home />;
const ProductRoute = () => <Product />;
const ContactRoute = () => <Contact />;

@inject('loginStore')
export default class TabViewExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
        index: 0,
        routes: [
          {key: 'home', title: 'Home'},
          {key: 'product', title: 'Products'},
          {key: 'contact', title: 'Contact Us'},
        ],
    };
  }
    static navigationOptions = ({ navigation }) => {
      return {
      headerTitle: 'TabView',
      headerLeft: (
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backButton}
            resizeMode='contain'
            source={require('../assets/back.png')}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('logout')}
        >
          <Image
            style={styles.logoutButton}
            resizeMode='contain'
            source={require('../assets/logout.png')}
          />
        </TouchableOpacity>
      )
      };
    };

    componentDidMount() {
      console.log(this.props.loginStore.email, this.props.loginStore.password)
      this.props.navigation.setParams({ logout: () => this.onLogout()});
    }

    onLogout = () => {
      AsyncStorage.clear();
      this.props.loginStore.clearLoginStore();
      this.props.navigation.navigate('Login');
    }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          home: HomeRoute,
          product: ProductRoute,
          contact: ContactRoute,
        })}
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBarStyle}
            renderLabel={({route, focused, color}) => (
              <Text style={[{color}, styles.labelText]}>{route.title}</Text>
            )}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBarStyle: {
    backgroundColor: 'pink',
  },
  indicator: {
    backgroundColor: 'white',
  },
  backButton: {
    height: 20,
    width: 15,
    marginHorizontal: 20,
    paddingTop: 15
  },
  logoutButton: {
    height: 20,
    width: 20,
    marginRight: 15,
    // paddingTop: 15
  },
});
