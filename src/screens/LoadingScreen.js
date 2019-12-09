import React, { Component } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import firebase from 'firebase';

class LoadingScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("yes")
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    })
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{marginBottom: 5, fontSize: 16}}>Checking Auth Status</Text>
        <ActivityIndicator size={"large"} />
      </View>
    )
  }
}

export default (LoadingScreen);