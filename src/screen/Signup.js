import { Box } from 'native-base'
import { HStack, Heading, VStack, FormControl, Input, Link, Button, Text, View } from 'native-base'
import React, { Component, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import auth from '@react-native-firebase/auth';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            passwordText1: '',
            confirmPassText: ''
        }



    } 

    render() {
        return (

            <NativeBaseProvider>
                <View style={styles.container}>
                    <Box safeArea p="2" w="90%" maxW="290" py="8">
                        <Heading size="lg" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }} fontWeight="semibold">
                            Welcome
                        </Heading>
                        <Heading mt="1" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="medium" size="xs">
                            Sign up to continue!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input {...this.props}
                                    value={this.state.emailText}
                                    onChangeText={emailText => this.setState({ emailText })}
                                    ref={this.props.InputRef} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input type="password" {...this.props}
                                    value={this.state.passwordText1}
                                    onChangeText={passwordText1 => this.setState({ passwordText1 })}
                                    ref={this.props.InputRef} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Confirm Password</FormControl.Label>
                                <Input type="password"
                                    {...this.props}
                                    value={this.state.confirmPassText}
                                    onChangeText={confirmPassText => this.setState({ confirmPassText })}
                                    ref={this.props.InputRef}
                                />
                            </FormControl>
                            <Button mt="2" colorScheme="indigo" style={styles.btnStyle}
                                onPress={async () => {
                                    await auth().createUserWithEmailAndPassword(this.state.emailText,this.state.passwordText1)
                                         .then(() => {
                                             console.log('User account created & sign in');
                                             console.log(auth().currentUser);
                                             this.props.navigation.navigate('TabNav')
 
                                         }).catch(error => {
                                             if (error.code === 'auth/email-already-in-use') {
                                                 console.log('that email address is allready in use!');
 
                                             }
                                             if (error.code === 'auth/invalid-email') {
                                                 console.log('that email address is invalid');
                                             }
                                             console.error(error);
 
                                         })
                                }} >
                                Sign up
                            </Button>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    I have an account.{" "}
                                </Text>
                                <Link _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm"
                                }} onPress={() => {
                                    this.props.navigation.navigate('Signin')
                                }}>
                                    Sign In
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </View>
            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    btnStyle: {
        borderRadius: 20
    }
})
