import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateAccount from './screens/CreateAccount';
import LogIn from './screens/LogIn';
import ConfirmSignUp from './screens/ConfirmSignUp';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';
import Loading from './components/Loading';
import { Auth, Hub, Logger } from 'aws-amplify';

const Stack = createNativeStackNavigator();

export default function Nav() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    // Returning all screens of my application
    useEffect(() => {
        getAuthUser(); // This will run checking if the user is Authenticated on th initial render
    }, [])

    const getAuthUser = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const authUser = await Auth.currentAuthenticatedUser();
            setIsSignedIn(true);
        } catch (e) {
            setIsSignedIn(false);
            console.log(e);
        }
        setLoading(false);
    }

    // listener for listening to auth events eg signIn, signOut, 
    const logger = new Logger('My-Logger');

    const listener = (data) => {
        switch (data.payload.event) {
            case 'signIn':
                logger.info('user signed in');
                getAuthUser();
                break;
            case 'signUp':
                logger.info('user signed up');
                getAuthUser();
                break;
            case 'signOut':
                logger.info('user signed out');
                getAuthUser();
                break;
        }
    }

    Hub.listen('auth', listener);

    if (loading) {
        return <Loading />; //Custom loading component
    }

    return (
        <Stack.Navigator >
            {isSignedIn ?
                <Stack.Screen name="Home" component={Home} options={{ headerShown: true, headerStyle: { backgroundColor: '#1C6758' }, headerTintColor: 'white' }} />
                :
                <>
                    <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: true, headerBackVisible: false, headerStyle: { backgroundColor: '#1C6758' }, headerTintColor: 'white' }} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: true, headerStyle: { backgroundColor: '#1C6758'}, headerTintColor: 'white' }} />
                    <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} options={{ headerShown: true, headerBackVisible: false, headerStyle: { backgroundColor: '#1C6758' }, headerTintColor: 'white' }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: true, headerBackVisible: false, headerStyle: { backgroundColor: '#1C6758' }, headerTintColor: 'white' }} />
                </>
            }

        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})