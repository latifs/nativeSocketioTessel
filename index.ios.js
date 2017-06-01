import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import socket from 'socket.io-client'
const io = socket.connect('http://localhost:3000')

export default class nativeSocketioTessel extends Component {
  constructor(){
    super()
    this.state = {
      message : 'nothing yet',
      timestamp: '',
      toSend: ''
    }
    
    io.on('message', (res) => {
      this.displayMessage(res)
    })
  }

  displayMessage(res) {
    this.setState(res)
  }

  sendMessage() {
    if(this.state.toSend.trim() !== '') {
      io.emit('call', this.state.toSend)
      this.setState({
        toSend: ''
      })
    }
  }

  render() {
    const { message, timestamp } = this.state
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Message From server:
        </Text>
        <Text style={styles.welcome}>
          {timestamp}: {message}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(toSend) => this.setState({toSend})}
          value={this.state.toSend}
        />
        <Button
          onPress={this.sendMessage.bind(this)}
          title="Send"
          color="#841584"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex:1,
    fontSize: 20,
    margin: 20,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    textAlignVertical: 'top',
    borderColor: 'gray',
    borderWidth: 1
  }
})

AppRegistry.registerComponent('nativeSocketioTessel', () => nativeSocketioTessel)
