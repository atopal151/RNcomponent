
import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { NativeBaseProvider, Box, Heading, VStack, Button, FormControl, Input, TextArea } from 'native-base'




export default class HomeScreen extends Component {

  state = {
    nameText: '',
    phoneText: '',
    addressText: '',
    dataId: '',
    users: [],
    userDataId: []
  }

  constructor(props) {
    super(props);
    this.subscriber = firestore().collection("AboutUser").onSnapshot(docs => {
      let users = []
      let userDataId = []
      docs.forEach(doc => {
        users.push(doc.data())
        userDataId.push(doc.id)
      })
      this.setState({ users, userDataId })
      console.log(this.state.users);
      console.log(this.state.userDataId);
    })
  }




  render() {
    return (
      <ScrollView>
        <NativeBaseProvider>
          <SafeAreaView>
            <Box>
              <VStack margin={5} w="90%" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <FormControl >
                  <FormControl.Label>Name - Surname</FormControl.Label>
                  <Input {...this.props}
                    value={this.state.nameText}
                    onChangeText={nameText => this.setState({ nameText })}
                    ref={this.props.InputRef} />
                </FormControl>
                <FormControl >
                  <FormControl.Label>Phone</FormControl.Label>
                  <Input {...this.props} keyboardType='numeric'
                    value={this.state.phoneText}
                    onChangeText={phoneText => this.setState({ phoneText })}
                    ref={this.props.InputRef} />
                </FormControl>
                <FormControl >
                  <FormControl.Label>Address</FormControl.Label>
                  <TextArea h={20} placeholder="Text Area Placeholder" w="100%"
                    {...this.props}
                    value={this.state.addressText}
                    onChangeText={addressText => this.setState({
                      addressText
                    })}
                    ref={this.props.InputRef}
                  />
                </FormControl>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                  <Button w="30%" size="sm" colorScheme="success" marginRight={5}
                    onPress={async () => {
                      await firestore().collection('AboutUser')
                        .add({ name: `${this.state.nameText}`, phone: `${this.state.phoneText}`, address: `${this.state.addressText}` })
                        .then(() => {
                          console.log('Info Added!');
                        })
                    }}>
                    Add
                  </Button>
                  <Button w="30%" size="sm" colorScheme="info"
                    onPress={async () => {
                      await firestore().collection('AboutUser').doc(`${this.state.dataId}`).update({
                        name: `${this.state.nameText}`, phone: `${this.state.phoneText}`, address: `${this.state.addressText}`
                      }).then(() => {
                        console.log('Data Updated.');
                      })
                    }}>
                    Update
                  </Button>
                </View>
                <View style={{ width: '100%' }}>
                  {
                    this.state.users.map((user, index) => <View key={index}>
                      <View style={styles.listStyle}>

                        <Text style={{ margin: 10 }}>( {index} - {this.state.userDataId[index]} - {user.name}) - ({user.phone}) - {user.address}</Text>
                        <View style={{ margin: 10, flexDirection: 'row' }}>
                          <Button colorScheme="warning" onPress={() => {
                            firestore().collection("AboutUser")
                              .doc(this.state.userDataId[index])
                              .delete()
                              .then(() => {
                                console.log('User Deleted!');
                                this.setState({ user })
                              })
                          }}>Delete</Button>
                          <Button style={{ marginLeft: 10 }} colorScheme="success" onPress={() => {
                            this.state.dataId = this.state.userDataId[index]
                            console.log(this.state.dataId);
                          }}>Seç</Button>
                        </View>

                      </View>
                    </View>
                    )}
                </View>
              </VStack>
            </Box>
          </SafeAreaView>
        </NativeBaseProvider>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  listStyle: {
    backgroundColor: '#dcdde1',
    borderRadius: 10,
    margin: 10,
    elevation: 5
  }
})

