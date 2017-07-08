import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class Component2 extends Component{
  render(){
    return(
      <View style={{backgroundColor:'#000000'}}>
        <Text style={{color:'red'}}>Hello Craig </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component2', () => Component2);
