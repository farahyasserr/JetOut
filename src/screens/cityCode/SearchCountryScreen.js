import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import axios from 'axios';
var config = {
  headers: {
    "x-rapidapi-host": "countries-cities.p.rapidapi.com",
    "x-rapidapi-key": "284d97e4f6msh816355ac946f4b6p1e8656jsn223f9c17887b"
  }
};
class SearchCountryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: '',
      error: ''
    }
  }
  searchButtonPressed() {
    axios.get(`https://countries-cities.p.rapidapi.com/location/country/${this.state.countryCode}?format=json`, config)
      .then(res => {
        console.log(res)
        this.props.navigation.navigate('CountryDetails', {
          data: res.data
        })
      })
      .catch(err => this.setState({ error: 'invalid country code' }))
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{ marginLeft: 10, marginRight: 20 }}>
            <Input
              label="Country Code"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              leftIcon={
                <Icon
                  name='search'
                  type="material-icons"
                />
              }
              onChangeText={(text) => {
                this.setState({ countryCode: text })
              }}
              value={this.state.countryCode}
              errorMessage={this.state.error !== '' ? this.state.error : ''}
              errorStyle={{ fontSize: 12, color: 'red' }}
            />
            <Button
              raised
              title="Search"
              titleStyle={{ textTransform: 'uppercase', fontSize: 21, fontWeight: 'bold', }}
              buttonStyle={{ backgroundColor: 'rgb(47, 125, 203)', borderRadius: 30, }}
              containerStyle={{ width: '80%', marginTop: 50, alignSelf: 'center', marginBottom: 10 }}
              onPress={this.searchButtonPressed.bind(this)}
              // loading={this.state.loading}
              disabled={this.state.countryCode === ''}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default (SearchCountryScreen);