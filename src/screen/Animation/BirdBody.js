import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import Wing from './Wing'
import Wing2 from './Wing2'

export default class BirdBody extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/body.png')}
          style={styles.birdStyle} />
        <View style={styles.wing1}>
          <Wing />
        </View>
        <View style={styles.wing2}>
          <Wing2/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', zIndex: 5 },
  birdStyle: {
    width: 150,
    height: 200
  },
  wing1:{
    position:'absolute',
    left:74,bottom:97
  },
  wing2:{
    position:'absolute',
    left:200,bottom:97
  }

})
