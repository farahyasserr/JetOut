import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

class CountryDetailsScreen extends Component {
  render() {
    let countryData = this.props.navigation.getParam('data')
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>{countryData.name}</Text>
            <View style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Capital: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>{countryData.capital}</Text></Text>
            </View>
            <View style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Population: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>{countryData.population}</Text></Text>
            </View>
            <View style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Area size: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>{countryData.area_size}</Text></Text>
            </View>
            <View style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Currency: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>{countryData.currency.name + " " + countryData.currency.code}</Text></Text>
            </View>
            <View style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Mother Tongue:
                   <Text style={{ fontSize: 18, fontWeight: 'normal' }}> {Object.values(countryData.languages)[0]}</Text>
              </Text>
            </View>
            <View style={{ alignSelf: 'flex-start', marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Continent: <Text style={{ fontSize: 18, fontWeight: 'normal' }}>{countryData.continent.name}</Text></Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}


export default CountryDetailsScreen;