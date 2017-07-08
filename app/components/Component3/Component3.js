import React, {Component} from 'react';
import {AppRegistry, Text, View, TextInput} from 'react-native';

export default class Component3 extends Component{
  constructor(){
    super();
    this.state = {
      textValue:'Hello'
    }
  }

  onChangeText(value){
    this.setState({
      textValue:value
    });
  }

  onSubmit(){
    console.log('Input submitted');
  }

  render(){
    return(
      <View>
        <TextInput
          placeholder="Enter text here"
          value={this.state.textValue}
          onChangeText={(value) => this.onChangeText(value)}
          onSubmitEditing={this.onSubmit}
        />
        <Text>{this.state.textValue}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component3', () => Component3);
