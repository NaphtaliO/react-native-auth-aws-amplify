import { ActivityIndicator, Button, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { Auth } from 'aws-amplify';



const ConfirmSignUp = ({ navigation, route }) => {
    const username = route.params.username;
    //const preferred_username = route.param.preferred_username;
    const [id, setId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const CELL_COUNT = 6;

    const confirmSignUp = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.confirmSignUp(username, value);

        } catch (error) {
            setError(error.message)
            console.log('error confirming sign up', error);
        }
        setLoading(false);
    }

    const resendConfirmationCode = async () => {
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            setError(err.message)
            console.log('error resending code: ', err);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={{
                    alignSelf: 'center',
                }}>Check your email for a verification code</Text>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFiledRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />
                <View style={styles.textField}>
                    {error == "" ? <Text></Text> : <Text style={[styles.text, { alignSelf: 'flex-start', color: 'red' }]}>{error}</Text>}

                </View>
                <Button title="Resend code" onPress={ resendConfirmationCode } />
                <TouchableOpacity style={[{ width: '80%' }, styles.buttonContainer]} onPress={confirmSignUp} >
                    <View>
                        {loading ? <ActivityIndicator style={{ padding: 10 }} size="small" color="white" />
                            : <Text style={styles.button}>Confirm</Text>}
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default ConfirmSignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: "center",
        padding: 15,
        //alignItems: "center",
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
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFiledRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    textField: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});