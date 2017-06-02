import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native'

import '../UserAgent';
const io = require('socket.io-client/dist/socket.io')

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      message : 'nothing yet',
      timestamp: '',
      toSend: ''
    }

    let { ip, port } = this.props.navigation.state.params
    this.socket = io(`http://${ip}:${port}`, {jsonp: false})
    this.socket.on('message', (res) => {
      this.setState(res)
    })
  }

  sendMessageToServer() {
    if(this.state.toSend.trim() !== '') {
      this.socket.emit('call', this.state.toSend.trim())
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
          onPress={this.sendMessageToServer.bind(this)}
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
    borderWidth: 1,
    margin: 10
  }
})
