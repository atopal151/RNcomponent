import React, { Component } from 'react'
import { Text, StyleSheet, View, setList, ScrollView, FlatList, SafeAreaView, ScrollViewBase } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { NativeBaseProvider, Box, Heading, VStack, Button, FormControl, Input, TextArea, SectionList } from 'native-base'



export default class SettingScreen extends Component {

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
              <Heading margin={5} size="lg" fontWeight="600" color="#2f3542" _dark={{
                color: "coolGray.800"
              }}>
                Welcome !
              </Heading>

              <View style={{margin:20, backgroundColor:'#dfe4ea',borderRadius:20, elevation:4}}>
              <Heading margin={10} size="md" fontWeight="400" color="coolGray.800" _dark={{
                color: "coolGray.800"
              }}>
                Mail Address: {
                  <Heading margin={10} size="md" fontWeight="400" color="coolGray.400" _dark={{
                    color: "coolGray.800"
                  }}>
                    {auth().currentUser.email}
                  </Heading>}
              </Heading>
              <Heading margin={10} size="md" fontWeight="400" color="coolGray.800" _dark={{
                color: "coolGray.800"
              }}>
                User ID: {
                  <Heading  size="md" fontWeight="400" color="coolGray.400" _dark={{
                    color: "coolGray.800"
                  }}>
                    {auth().currentUser.uid}
                  </Heading>}
              </Heading>
              </View>
              <Button style={{ margin: 20 ,borderRadius:50}} colorScheme='warning' onPress={() => {
                auth().signOut().then(() => {
                  console.log('Sign Out');
                  this.props.navigation.navigate('Signin')
                })
              }} >Sign Out</Button>

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


/*                   <FlatList
                      style={{width:'90%'}}
                        data={this.state.users}
                        keyExtractor={(item)=> item.key}
                        renderItem={
                          ()=>{
                            console.log(user.name);
                            return(<View><Text>{user.name}</Text></View>)
                          }
                        } />

*/