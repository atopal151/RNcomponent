

import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import AnimatedMarker from './AnimatedMarker'
import Permissions from 'react-native-permissions'

export default class Markers extends Component {
  state = {
    region: {
      latitude: 65.68751669,
      longitude: -16.83041914,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [
      {
        latlng: {
          latitude: 65.68751669,
          longitude: -16.83041914,
        },
        title: 'Homes',
        description: 'Loremm Ipsumm'
      },
      {
        latlng: {
          latitude: 65.68851669,
          longitude: -16.83041914,
        },
        title: 'Work',
        description: 'Loremm Ipsumm'
      },
      {
        latlng: {
          latitude: 65.68451669,
          longitude: -16.83041914,
        },
        title: 'Village',
        description: 'Loremm Ipsumm'
      }
    ]
  }

  componentDidMount()  {
    /*Permissions.request('location').then(async response=>{
      const data =await this.getCurrentPosition();
    })*/
  }

	getCurrentPosition() {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((position) => {
				resolve(position)
			}),
				reject,
				{
					enableHighAccuracy: false,
					timeout: 5000,
					maximumAge: 1000
				}
		},)
	}
  render() {
    return (
      <View style={styles.container}>

        <MapView
       
          style={styles.map}
          region={this.state.region}>
          {
            this.state.markers.map((marker, key) => (
              <Marker
                key={key}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}>
                  <AnimatedMarker/>
                </Marker>
            ))
          }
        </MapView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',



  },
  map: {
    flex: 1
  }
})