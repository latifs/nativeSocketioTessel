import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Main from './App/Components/MainScreen'
import Home from './App/Components/HomeScreen'

const nativeSocketioTessel = StackNavigator({
  home: { screen: Home },
  main: { screen: Main }
})

AppRegistry.registerComponent('nativeSocketioTessel', () => nativeSocketioTessel)
