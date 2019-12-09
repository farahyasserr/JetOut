import React, { Component } from 'react';
import { Icon, Button, Image, Input } from 'react-native-elements';
import { SafeAreaView, ImageBackground, ScrollView, Text, View } from 'react-native';
import firebase from 'firebase';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    }
    
  }
  onLoginSucces() {
    console.log("success")
    this.props.navigation.navigate('App');
  }
  onLoginButtonPressed() {
    let { email, password } = this.state;
    this.setState({ error: '', loading: true })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucces.bind(this))
      .catch(() => {
        // this.setState({ error: 'Authentication failed', loading: false })
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSucces.bind(this))
          .catch(() => {
            this.setState({ error: 'Authentication failedsss', loading: false })
          })
      })
  }
  render() {
    return (
      <ImageBackground source={require('../assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}> */}
          <View style={{ flex: 1, alignItems: 'center', marginLeft: 20, marginRight: 20, marginTop: 40 }}>

            <Text style={{ color: 'black', fontSize: 41, fontWeight: 'bold', flex: 2 }}> Jet Out</Text>
            <View style={{ width: '100%', flex: 3 }}>
              <Input
                containerStyle={{ marginTop: 24, }}
                inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
                leftIcon={
                  <Icon
                    name='email'
                    type="material-icons"
                  />
                }
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
              />
              <Input
                secureTextEntry
                containerStyle={{ marginTop: 24, }}
                inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
                leftIcon={
                  <Icon
                    name='lock'
                    type="material-icons"
                  />
                }
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <Text style={{ fontSize: 16, color: 'red', alignSelf: 'center' }}>{this.state.error}</Text>
              <Button
                raised
                title="Log In"
                titleStyle={{ textTransform: 'uppercase', fontSize: 21, fontWeight: 'bold', }}
                buttonStyle={{ backgroundColor: 'rgb(47, 125, 203)', borderRadius: 15, }}
                containerStyle={{ width: '100%', marginTop: 50, }}
                onPress={this.onLoginButtonPressed.bind(this)}
                disabled={this.state.email === '' || this.state.password === ''}
                loading={this.state.loading}
              />
            </View>
          </View>
          {/* </ScrollView> */}
        </SafeAreaView>
      </ImageBackground>

    )
  }
}

export default LoginScreen;