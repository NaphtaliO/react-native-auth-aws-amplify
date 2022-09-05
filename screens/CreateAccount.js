import { ActivityIndicator, Button, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const CreateAccount = ({ navigation }) => {
    const [username, setUsername] = useState(''); // The email
    const [preferred_username, setPreferred_username] = useState('')  // The Username
    const [password, setPassword] = useState(''); // The Password
    const [error, setError] = useState(null); // Errors on creating an account
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        if (loading) {
            return;
        }

        setLoading(true);
        try {
            const { user } = await Auth.signUp({
                username,  // email of the user
                password, // password of the user
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                },
                attributes: {
                    preferred_username,          // optional
                    //phone_number,   // optional - E.164 number convention
                    // other custom attributes 
                }
            });
            console.log(user); 
            navigation.navigate('ConfirmSignUp', {
                username: username,  //The email of the user. It has to be called username
                preferred_usernamee: preferred_username,   //This is the actual user name being passed to the confirm signup screen
            });
        } catch (error) {
            setError(error.message)
            console.log('error signing up:', error);
        }
        setLoading(false);
    }


    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}  
                    onChangeText={text => setUsername(text)} 
                    value={username}
                    placeholder={'Email'}
                    defaultValue={username}
                    autoCapitalize={false}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPreferred_username(text)}
                    value={preferred_username}
                    placeholder={'Username'}
                    defaultValue={preferred_username}
                    autoCapitalize={false}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder={'Password'}
                    defaultValue={password}
                    secureTextEntry={true}
                />
            </View>

            <View style={{ flexDirection: 'row', width: '75%', alignSelf: 'center', margin: 10, }}>
                {error == null ? null :
                    <Text style={{ color: 'red' }}>{error}</Text>}
            </View>
            <TouchableOpacity onPress={signUp}>
                <View style={styles.buttonContainer}>
                    {loading ? <ActivityIndicator style={{ padding: 10 }} size="small" color="white" />
                        : <Text style={styles.button}>Create Account</Text>}
                </View>
            </TouchableOpacity>
            <View style={styles.bottom}>
                <Text>Already have an account?  </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                    <Text style={{ color: '#1C6758' }}>Log In</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )
}

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    inputContainer: {
        width: '80%',
        alignSelf: 'center',
        //justifyContent: 'center',
    },
    input: {
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10

    },
    buttonContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#1C6758',
        borderRadius: 15,
    },
    button: {
        color: 'white',
        padding: 10,
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderStyle: 'solid',
        borderTopWidth: .5,
        borderTopColor: 'black',
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    }
});