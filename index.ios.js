import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Main from './App/Components/Main'

export default class nativeSocketioTessel extends Component {
  render() {
    return (
      <Main />
    )
  }
}

AppRegistry.registerComponent('nativeSocketioTessel', () => nativeSocketioTessel)
