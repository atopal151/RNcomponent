import { Box } from 'native-base'
import { View, HStack, Heading, VStack, FormControl, Input, Link, Button, Text, } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Signup from './Signup'
import { NativeBaseProvider } from 'native-base'
import auth from '@react-native-firebase/auth'

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailText: '',
            passwordText: ''
        }
    }

    componentDidMount() {
        if (auth().currentUser !== null) {
            console.log(`User: ${auth().currentUser.email}`);
            this.props.navigation.navigate('TabNav')
        }
    }



    render() {
        return (
            <NativeBaseProvider  >
                <View style={styles.container}>
                    <Box safeArea p="2" py="8" w="90%" maxW="290"  >
                        <Heading size="xl" fontWeight="600" color="coolGray.800" _dark={{
                            color: "coolGray.800"
                        }}>
                            Welcome
                        </Heading>
                        <Heading mt="1" _dark={{
                            color: "warmGray.200"
                        }} color="coolGray.600" fontWeight="medium" size="xs">
                            Sign in to continue!
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl >
                                <FormControl.Label>Email</FormControl.Label>
                                <Input {...this.props}
                                    value={this.state.emailText}
                                    onChangeText={emailText => this.setState({ emailText })}
                                    ref={this.props.InputRef} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input type="password" {...this.props}
                                    value={this.state.passwordText}
                                    onChangeText={passwordText => this.setState({ passwordText })}
                                    ref={this.props.InputRef} />
                            </FormControl>
                            <Button mt="2" colorScheme="indigo" style={styles.btnStyle} onPress={async () => {
                                await auth().signInWithEmailAndPassword(this.state.emailText, this.state.passwordText)
                                    .then(() => {
                                        console.log('User signed in!');
                                        this.state.emailText = ''
                                        this.state.passwordText = ''
                                        this.props.navigation.navigate('TabNav')
                                    }).catch(error => {
                                        if (error.code === 'auth/email-already-in-use') {
                                            console.log('That email address is already in use!');
                                        }
                                        if (error.code === 'auth/invalid-email') {
                                            console.log('That email address is invalid!');
                                        }
                                        console.error(error);
                                    });
                            }}>
                                Sign in
                            </Button>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    I'm a new user.{" "}
                                </Text>
                                <Link _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm"
                                }} onPress={() => {
                                    this.props.navigation.navigate('Signup')
                                }}>
                                    Sign Up
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
