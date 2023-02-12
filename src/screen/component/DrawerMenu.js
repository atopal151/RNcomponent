import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import auth from '@react-native-firebase/auth';


export default class DrawerMenu extends Component {

  constructor(props) {
    super(props);
    this.state={
    }
  }




  render() {

    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              auth().signOut().then(() => {
                console.log('Sign Out');
                this.props.navigation.navigate('Signin')
              })
              }
            }
          >
            <Text style={{ color: 'white' }}>Log Out</Text>
          </TouchableOpacity>

        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}> Drawer Menu </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingVertical: 40
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    paddingVertical: 10
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 11
  },
  menuItem: {
    padding: 10,
    margin: 10,
    borderRadius: 5,

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center'

  },
  menuText: {
    fontSize: 13,
    color: '#333',
    margin: 5

  },
  iconStyle: {
    height: 50,
    margin: 5,
    width: 50,
  }
});