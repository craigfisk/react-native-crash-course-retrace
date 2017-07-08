import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class Component1 extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: 'Craig',
      showName: true,
      message: 'Your message might be: ' + this.props.message
    }
  }

  static defaultProps = {
    message: 'Fruit cake is really tasty!'
  }

  render(){
    let name = this.state.showName ? this.state.name : 'No name!';
    console.log('Hello! Value for name: ' + name);
    return(
      <View>
        <Text>{this.state.message}</Text>
        <Text>{name}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component1', () => Component1);
