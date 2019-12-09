import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import firebase from 'firebase';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: firebase.auth().currentUser.email
    }
  }
  logOutButtonPressed() {
    firebase.auth().signOut().then(() => this.props.navigation.navigate('Auth'))
  }
  myFavoritesButtonPressed() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/favorites`)
      .on('value', snapshot => {
        console.log(snapshot.val())
        this.props.navigation.navigate('MyFavorites', {
          data: snapshot.val()
        })
      })
  }
  render() {
    return (

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ marginLeft: 20, marginRight: 20, }}>
            <Text style={styles.titleStyle}>Profile</Text>
            <View style={{ marginTop: 20 }}>
              <Input
                label='Email'
                labelStyle={styles.labelStyle}
                inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
                leftIcon={
                  <Icon
                    name='email'
                    type="material-icons"
                  />
                }
                value={this.state.email}
                disabled
              />
              <Button
                title="My Favorites"
                type="clear"
                titleStyle={{ textTransform: 'uppercase', fontSize: 21, fontWeight: 'bold', color: 'black' }}
                buttonStyle={{ borderRadius: 30, }}
                containerStyle={{ width: '80%', marginTop: 50, alignSelf: 'center', marginBottom: 10, backgroundColor: 'transparent' }}
                onPress={this.myFavoritesButtonPressed.bind(this)}
                icon={
                  <Icon
                    name="heart"
                    type="entypo"
                    color="red"
                    containerStyle={{ marginRight: 10 }}
                  />
                }
              />
            </View>
          </View>
        </ScrollView>
        <Button
          title="Log Out"
          type='clear'
          titleStyle={{ textTransform: 'uppercase', fontSize: 21, fontWeight: 'bold', color: 'red' }}
          buttonStyle={{ borderRadius: 30, }}
          containerStyle={{ width: '80%', marginTop: 50, alignSelf: 'center', marginBottom: 10 }}
          onPress={this.logOutButtonPressed.bind(this)}
          loading={this.state.loading}
        />
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold'
  },
  labelStyle: {
    fontSize: 18,
    color: 'black',
    // fontWeight: 'bold'
  }
})

export default HomeScreen;