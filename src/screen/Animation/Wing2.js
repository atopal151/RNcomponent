import React, { Component } from 'react'
import { Text, StyleSheet, View,Image,Animated, Easing } from 'react-native'

export default class Wing2 extends Component {
    state={
        animation:new Animated.Value(0)
    }

    componentDidMount(){
        this.startAnimation()
    }

    startAnimation=()=>{
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.animation, {
                    duration:400,
                    toValue:3,
                    useNativeDriver:false,
                }),
                Animated.timing(this.state.animation, {
                    duration:500,
                    toValue:0,
                    useNativeDriver:false,
                })
            ])
        ).start()
    }

  render() {
    const animatedStyles={top:this.state.animation}

    return (
      <Animated.Image style={[styles.wingStyle ,animatedStyles]} 
      source={require('../../../assets/right.png')} 
      resizeMode='contain'/>
    )
  }
}

const styles = StyleSheet.create({
    wingStyle:{width:70,height:70,position:'absolute',left:-99,top:10}
})