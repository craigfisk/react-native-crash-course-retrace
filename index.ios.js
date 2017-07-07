import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class myapp extends Component{
  render(){
    return(
      <View>
        <Text>Hello there, world!</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('myapp', () => myapp);
