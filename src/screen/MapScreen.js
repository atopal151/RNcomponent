import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Markers from './Map/Markers'
import Region from './Map/Region'

export default class MapScreen extends Component {
  render() {
    return (
       <Markers/>
    )
  }
}

const styles = StyleSheet.create({})
