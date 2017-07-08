import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';

export default class Component2 extends Component{
  render(){
    return(
      <View>
        <Text style={{color:'red'}}>Hello Craig </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component2', () => Component2);
