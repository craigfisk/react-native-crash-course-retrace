import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

import Component3 from './app/components/Component3/Component3';

export default class myapp extends Component{
  render(){
    return(
      <View>
        <Component3 />
      </View>
    );
  }
}

AppRegistry.registerComponent('myapp', () => myapp);
