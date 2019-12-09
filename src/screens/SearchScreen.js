import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import { Input, Icon, Button, ListItem } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

var config = {
  headers: {
    "x-rapidapi-host": "apidojo-hipmunk-v1.p.rapidapi.com",
    "x-rapidapi-key": "284d97e4f6msh816355ac946f4b6p1e8656jsn223f9c17887b"
  }
};
class SearchScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new moment().format('MMM DD YYYY'),
      from: '',
      to: '',
      noOfAdults: '',
      noOfChildren: '',
      fromArray: [],
      toArray: [],
      fromCityCode: '',
      toCityCode: '',
      loading: false
    }
    this.searchFrom = this.searchFrom.bind(this);
    this.searchFromDebounced = _.debounce(this.searchFrom, 1000);
    this.searchTo = this.searchTo.bind(this);
    this.searchToDebounced = _.debounce(this.searchTo, 1000);
  }
  searchFrom(text) {

    axios.get(`https://apidojo-hipmunk-v1.p.rapidapi.com/locations/search?query=${text}`, config)
      .then(res => {
        this.setState({ fromArray: res.data.endpoints.station })
        console.log(res.data.endpoints.station)
      }).catch(err => console.log(err))
  }
  searchTo(text) {
    axios.get(`https://apidojo-hipmunk-v1.p.rapidapi.com/locations/search?query=${text}`, config)
      .then(res => {
        this.setState({ toArray: res.data.endpoints.station })
        console.log(res.data.endpoints.station)
      }).catch(err => console.log(err))
  }
  searchButtonPressed() {
    this.setState({ loading: true })
    axios.get(`https://apidojo-hipmunk-v1.p.rapidapi.com/flights/create-session?&children=${this.state.noOfChildren}&from0=${this.state.fromCityCode}&to0=${this.state.toCityCode}&date0=${this.state.date}&pax=${this.state.noOfAdults}`, config)
      .then(res => {
        this.setState({ loading: false })
        let data = Object.values(res.data.itins)
        this.props.navigation.navigate('SearchResults', {
          data,
          state: this.state
        })
      }).catch(err => {
        this.setState({ loading: false })
        console.log(err.response)
      })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{ marginLeft: 10, marginRight: 20 }}>
            <Input
              label="From"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              leftIcon={
                <Icon
                  name='aircraft-take-off'
                  type="entypo"
                />
              }
              onChangeText={(text) => {
                this.searchFromDebounced(text)
                this.setState({ from: text })
              }}
              value={this.state.from}
              errorMessage={this.state.fromArray.length > 0 ? 'choose from the listed options' : ''}
            />
            <FlatList
              data={this.state.fromArray}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <ListItem
                    title={item.display_name}
                    onPress={() => this.setState({ fromCityCode: item.code, fromArray: [], from: item.display_name })}

                  />
                )
              }
              }
            />
            <Input
              label="To"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              leftIcon={
                <Icon
                  name='aircraft-landing'
                  type="entypo"
                />
              }
              onChangeText={(text) => {
                this.searchToDebounced(text)
                this.setState({ to: text })
              }}
              errorMessage={this.state.toArray.length > 0 ? 'choose from the listed options' : ''}
              value={this.state.to}
            />
            <FlatList
              data={this.state.toArray}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <ListItem
                    title={item.display_name}
                    onPress={() => this.setState({ toCityCode: item.code, toArray: [], to: item.display_name })}
                  />
                )
              }
              }
            />
            <View style={{ flexDirection: 'column', marginTop: 14, marginLeft: 10, marginRight: 10 }}>
              {/* <Icon
                name='email'
                type="material_community_icons"
                containerStyle={{ marginTop: 10 }}
              /> */}
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date</Text>
              <DatePicker
                style={{ width: '100%', borderRadius: 15 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="MMM DD YYYY"
                minDate={new Date()}
                maxDate="2025-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderRadius: 15,
                    borderBottomWidth: 0,
                    // width:'100%'
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  let d = new moment(date)
                  d = d.format('MMM DD YYYY')
                  console.log(d)
                  this.setState({ date: d })
                }}
              />
            </View>

            <Input
              label="No. of children"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              leftIcon={
                <Icon
                  name='child'
                  type="font-awesome"
                />
              }
              onChangeText={(text) => this.setState({ noOfChildren: text })}
              keyboardType={'number-pad'}

            />
            <Input
              label="No. of adults"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              leftIcon={
                <Icon
                  name='man'
                  type="entypo"
                />
              }
              onChangeText={(text) => this.setState({ noOfAdults: text })}
              keyboardType={'number-pad'}
            />
          </View>
        </ScrollView>
        {/* <View style={{}}> */}
        <Button
          raised
          title="Search"
          titleStyle={{ textTransform: 'uppercase', fontSize: 21, fontWeight: 'bold', }}
          buttonStyle={{ backgroundColor: 'rgb(47, 125, 203)', borderRadius: 30, }}
          containerStyle={{ width: '80%', marginTop: 50, alignSelf: 'center', marginBottom: 10 }}
          onPress={this.searchButtonPressed.bind(this)}
          loading={this.state.loading}
          disabled={this.state.fromCityCode === '' || this.state.toCityCode === '' || this.state.noOfAdults === '' || this.state.noOfChildren === ''}
        />
        {/* </View> */}
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

export default SearchScreen;