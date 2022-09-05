import { ActivityIndicator, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const LogIn = ({ navigation, }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const user = await Auth.signIn(username, password);
        } catch (error) {
            setError(error.message)
            console.log('error signing in', error);
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
                    onChangeText={text => setPassword(text)}
                    value={password}
                    placeholder={'Password'}
                    defaultValue={password}
                    secureTextEntry={true}
                />
            </View>

            <View style={{ flexDirection: 'row', width: '75%', alignSelf: 'center', margin: 10, }}>
                {error ?
                    <>
                        <Text style={{ color: 'red', }}>{error}</Text>
                        <TouchableOpacity style={{ marginLeft: 'auto' }}><Text style={{fontSize: 12}}>Forgot Password</Text></TouchableOpacity>
                    </> : null}
            </View>
            <TouchableOpacity onPress={signIn}>
                <View style={styles.buttonContainer}>
                    {loading ? <ActivityIndicator style={{ padding: 10 }} size="small" color="white" />
                        : <Text style={styles.button}>Sign In</Text>}
                </View>
            </TouchableOpacity>
            <View style={styles.bottom}>
                <Text>Don't have an account?  </Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                    <Text style={{ color: '#1C6758' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LogIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
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