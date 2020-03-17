import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class Contact extends Component {
  render() {
    return (
      <View style={[styles.scene]}>
        <Text style={{fontSize: 20}}>Contact Us</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
