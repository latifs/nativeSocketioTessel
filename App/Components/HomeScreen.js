import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput
} from 'react-native'

export default class HomeScreen extends Component {
  constructor(){
    super()
    this.state = {
      ip: '',
      port: ''
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { ip, port } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.ip}
          onChangeText={ip => this.setState({ip})}
          placeholder="enter IP here" 
        />
        <TextInput
          style={styles.input}
          value={this.state.port}
          onChangeText={port => this.setState({port})}
          placeholder="enter Port here" 
        />
        <Button
          title='send'
          onPress={() =>
            navigate('main', { ip, port })
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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