import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    const getAuthUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        setUser(authUser);
        console.log(authUser);
      } catch (e) {
        console.log(e);
      }
    }
    getAuthUser();
  }, [])

  if (user) {
    return (
      <View style={styles.container}>
        <Text>Welcome {user.attributes.preferred_username}</Text>
        <TouchableOpacity onPress={signOut}>
          <View style={styles.buttonContainer}>
            {loading ? <ActivityIndicator style={{ padding: 10 }} size="small" color="white" />
              : <Text style={styles.button}>Sign Out</Text>}
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
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
})