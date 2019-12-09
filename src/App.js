/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppNavigator from './navigation/Navigator';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import Firebase from 'firebase';
class App extends Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp({
      apiKey: "AIzaSyDBDb9tiVLfSHicq-hKOpuVNvNo7ngku68",
      authDomain: "jetout-39785.firebaseapp.com",
      databaseURL: "https://jetout-39785.firebaseio.com",
      projectId: "jetout-39785",
      storageBucket: "jetout-39785.appspot.com",
      messagingSenderId: "228132940750",
      appId: "1:228132940750:web:9aa0fc79fc868525a2199f",
      measurementId: "G-BHDCP2VTRP"
    })
  }
  componentDidMount() {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
  }
  render() {
    return (
      <AppNavigator />
      // <HomeScreen />
      // <SearchScreen />
    )
  }
}
export default App;
