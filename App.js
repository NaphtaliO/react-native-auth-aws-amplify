import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Nav from './Nav';
import { Amplify } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

export default function App() {
  return (
    <NavigationContainer>
      <Nav /> 
      <StatusBar style="auto" />
    </NavigationContainer>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
