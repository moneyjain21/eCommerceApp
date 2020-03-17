import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { inject, observer } from 'mobx-react';
import Carousel from 'react-native-carousel';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

@observer
class HomePage extends Component {

  static navigationOptions = {
    header: null
  };

  state = {
    height: SCREEN_HEIGHT
  }

  onLayout = (e) => {
    this.setState({
      height: e.nativeEvent.layout.height,
    })
  }

  getResolution = () => {
    return this.state.height * 0.35
  }

  onPress_loginBtn = () => {
    this.props.navigation.navigate('Login');
  };

  onPress_Register = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    const resolution = this.getResolution();
    const carouselImage = {
      width: SCREEN_WIDTH,
      height: resolution,
      // borderRadius: resolution / 2,
      alignSelf: 'center',
    }
    return (
      <SafeAreaView onLayout={this.onLayout} style={styles.container}>
        <Image
          style={{alignSelf: 'center', marginTop: 20}}
          resizeMode={'contain'}
          source={require('../assets/icon.png')}
        />
        <View style={{ flex: 0.7, paddingTop: 40,}}>
          <Carousel
            delay={3000}
            indicatorOffset={resolution * 1.1}
            indicatorAtBottom={false}
            indicatorSize={50}
            indicatorColor="#46A312"
            inactiveIndicatorColor="#202F42"
            alignSelf={'center'}
          >
            <View style={styles.carouselCard}>
              <Image
                style={carouselImage}
                resizeMode={'cover'}
                source={require('../assets/carousel_1.jpg')}
              />
              <Text style={[styles.footerText, {marginTop: 20}]}>
                Unique and Enthralling range of decorative Items
              </Text>
            </View>
            <View style={styles.carouselCard}>
              <Image
                style={carouselImage}
                resizeMode={'cover'}
                source={require('../assets/carousel_2.jpg')}
              />
              <Text style={[styles.footerText, {marginTop: 20}]}>
                Blend your soul in the aura of Blue Pottery facinations
              </Text>
            </View>
            <View style={styles.carouselCard}>
              <Image
                style={carouselImage}
                resizeMode={'cover'}
                source={require('../assets/carousel_3.jpg')}
              />
              <Text style={[styles.footerText, {marginTop: 20}]}>
                Eye Catching exquisite motif and design
              </Text>
            </View>
            <View style={styles.carouselCard}>
              <Image
                style={carouselImage}
                resizeMode={'cover'}
                source={require('../assets/carousel_4.jpg')}
              />
              <Text style={[styles.footerText, {marginTop: 20}]}>
                Add a touch of whimsy and color to your walls
              </Text>
            </View>
            <View style={styles.carouselCard}>
              <Image
                style={carouselImage}
                resizeMode={'cover'}
                source={require('../assets/carousel_5.jpg')}
              />
              <Text style={[styles.footerText, {marginTop: 20}]}>
                Wide range of exclusive blue pottery products available
              </Text>
            </View>
          </Carousel>
        </View>
        <View style={{ flex: 0.3, alignItems: 'center'}}>
          <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#46A312',}]} onPress={() => this.onPress_loginBtn()}>
            <Text style={{textAlign: 'center', alignSelf: 'center', paddingVertical: 20, fontSize: 18, fontWeight: 'bold', color: '#ffffff'}}>Login</Text>
          </TouchableOpacity>
          <View style={{height: 20}}></View>
          <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#202F42',}]} onPress={() => this.onPress_Register()}>
            <Text style={{textAlign: 'center', alignSelf: 'center', paddingVertical: 20, fontSize: 18, fontWeight: 'bold', color: '#ffffff'}}>Register</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
  }
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 240,
    height: 44,
    marginBottom: 37,
    alignSelf: 'center',
  },
  footerText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#202F42',
    fontSize: 14
  },
  carouselCard: {
    width: SCREEN_WIDTH,
  },
  buttonStyle: {
    height: 60,
    width: SCREEN_WIDTH * 0.75,
    borderRadius: 30
  }
});

export default HomePage;
