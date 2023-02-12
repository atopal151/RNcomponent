import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import SignIn from './screen/Signin';
import Signup from './screen/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerMenu from './screen/component/DrawerMenu';
import ContactScreen from './screen/ContactScreen';
import SettingScreen from './screen/SettingScreen';
import HomeScreen from './screen/HomeScreen';
import ContactDetail from './screen/ContactDetail';
import MapScreen from './screen/MapScreen';


const MapStack = createNativeStackNavigator();


function MapStackScreen() {
    return (
        <MapStack.Navigator>
            <MapStack.Screen name="Contact" component={MapScreen}
                options={{
                    headerShown: false
                }} />
        </MapStack.Navigator>
    );
}


const ContactStack = createNativeStackNavigator();


function ContactStackScreen() {
    return (
        <ContactStack.Navigator>
            <ContactStack.Screen name="Contact" component={ContactScreen}
                options={{
                    headerShown: false
                }} />
            <ContactStack.Screen name="Condetail" component={ContactDetail}
                options={{
                    headerShown: true
                }}
            />

        </ContactStack.Navigator>
    );
}


const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={HomeScreen}
                options={{
                    headerShown: false
                }} />
        </HomeStack.Navigator>
    )
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    headerShown: false
                }} />
        </SettingsStack.Navigator>
    );
}


const Tab = createBottomTabNavigator();

function TabNavStack() {
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: { backgroundColor: '#f2f2f2' } }}>
            <Tab.Screen name="HomeStack" component={HomeStackScreen}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../assets/home.png')}
                            style={[styles.iconStyle]}
                        />
                    ),
                    tabBarLabel: 'Home Page', headerShown: false
                }} />
            <Tab.Screen name="ContactStack" component={ContactStackScreen} options={{
                tabBarIcon: () => (
                    <Image
                        source={require('../assets/phone.png')}
                        style={[styles.iconStyle]}
                    />
                ), tabBarLabel: 'Constant Page', headerShown: false
            }} />
            <Tab.Screen name="MapStack" component={MapStackScreen} options={{
                tabBarIcon: () => (
                    <Image
                        source={require('../assets/maps.png')}
                        style={[styles.iconStyle]}
                    />
                ), tabBarLabel: 'Map Page', headerShown: false
            }} />
            <Tab.Screen name="SettingsStack" component={SettingsStackScreen} options={{
                tabBarIcon: () => (
                    <Image
                        source={require('../assets/user.png')}
                        style={[styles.iconStyle]}
                    />
                ), tabBarLabel: 'Setting Page', headerShown: false,
            }} />
        </Tab.Navigator>
    );
}


const Drawer = createDrawerNavigator();




export default class Router extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    drawerContent={(props) => <DrawerMenu{...this.props} />}
                    screenOptions={{
                        drawerStyle: { width: 100 }
                    }}>
                    <Drawer.Screen style={{ flex: 1, }} name='Signin' component={SignIn} options={{ headerShown: false }} />

                    <Drawer.Screen name='TabNav' component={TabNavStack} options={{ headerShown: false }} />
                    <Drawer.Screen name='Signup' component={Signup} options={{ headerShown: false }} />

                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    iconStyle: {
        height: 24,
        margin: 5,
        width: 24,

    }
})
