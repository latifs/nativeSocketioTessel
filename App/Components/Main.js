import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native'

import socket from 'socket.io-client'
const io = socket.connect('http://localhost:3000')

export default class Main extends Component {
  constructor(){
    super()
    this.state = {
      message : 'nothing yet',
      timestamp: '',
      toSend: ''
    }
    
    io.on('message', (res) => {
      this.setState(res)
    })
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
    const { message, timestamp , toSend } = this.state
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
          value={toSend}
        />
        <Button
          onPress={this.sendMessage.bind(this)}
          title="Send"
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
