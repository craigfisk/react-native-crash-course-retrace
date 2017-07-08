import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';

export default class Component2 extends Component{
  render(){
    return(
      <View style={styles.myView}>
        <Text style={styles.myText}>Hello Craig </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myView: {
    backgroundColor: 'blue'
  },
  myText: {
    color: 'white'
  }
});

AppRegistry.registerComponent('Component2', () => Component2);
