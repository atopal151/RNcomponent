import { NativeBaseProvider } from 'native-base'
import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, View, } from 'react-native'
import Router from './src/Router'
import SignIn from './src/screen/Signin'
import Signup from './src/screen/Signup'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router />
      </Fragment>
    )
  }
}



