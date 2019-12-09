import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Icon, Input, Button, ListItem } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

var config = {
  headers: {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "284d97e4f6msh816355ac946f4b6p1e8656jsn223f9c17887b"
  }
};
class SearchHotelsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      citiesArray: [],
      cityCode: '',
      rooms: '',
      noOfAdults: '',
      loading: false,
      error: '',
      date: new moment().format('YYYY-MM-DD'),
      noOfNights: ''

    }
    this.cityNameChanged = this.cityNameChanged.bind(this);
    this.cityNameChangedDebounced = _.debounce(this.cityNameChanged, 1000);
  }

  cityNameChanged(text) {
    axios.get(`https://tripadvisor1.p.rapidapi.com/locations/search?query=${this.state.cityName}&lang=en_US&units=km`, config)
      .then(res => {
        this.setState({ citiesArray: res.data.data })
        console.log(res)
      }).catch(err => console.log(err))
  }
  searchButtonPressed() {
    this.setState({ loading: true })
    console.log(this.state.cityCode)
    axios.get(`https://tripadvisor1.p.rapidapi.com/hotels/list?zff=4%252C6&offset=0&subcategory=hotel%252Cbb%252Cspecialty&hotel_class=1%252C2%252C3&limit=30&checkin=${this.state.date}&order=asc&lang=en_US&sort=recommended&nights=${this.state.noOfNights}&location_id=${this.state.cityCode}&adults=${this.state.noOfAdults}&rooms=${this.state.rooms}`, config)
      .then(res => {
        this.setState({ loading: false })
        if (res.data.data) {
          this.props.navigation.navigate('HotelsResults', {
            data: res.data.data
          })
        } else {
          this.setState({ error: 'Invaid City!, Please Try again' })
        }

      }).catch(err => {
        this.setState({ loading: false, error: 'Invaid City!, Please Try again' })
        console.log(err)
      })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{ marginLeft: 10, marginRight: 20 }}>
            <Input
              label="City name"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              leftIcon={
                <Icon
                  name='location-city'
                  type="material-icons"
                />
              }
              onChangeText={(text) => {
                this.cityNameChangedDebounced(text)
                this.setState({ cityName: text })
              }}
              value={this.state.cityName}
              errorMessage={this.state.citiesArray.length > 0 ? 'choose from the listed options' : ''}
            />
            <FlatList
              data={this.state.citiesArray}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => {
                return (
                  <ListItem
                    title={item.result_object.location_string}
                    onPress={() => this.setState({ cityCode: item.result_object.location_id, citiesArray: [], cityName: item.result_object.location_string })}
                  />
                )
              }
              }
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
              value={this.state.noOfAdults}
            />
            <Input
              label="No. of rooms"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              onChangeText={(text) => this.setState({ rooms: text })}
              keyboardType={'number-pad'}
              value={this.state.rooms}
              leftIcon={
                <Icon
                  name='format-list-numbered'
                  type="material-icon"
                />
              }
            />
            <View style={{ flexDirection: 'column', marginTop: 14, marginLeft: 10, marginRight: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Check In</Text>
              <DatePicker
                style={{ width: '100%', borderRadius: 15 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format='YYYY-MM-DD'
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
                  d = d.format('YYYY-MM-DD')
                  this.setState({ date: d })
                }}
              />
            </View>
            <Input
              label="No. of nights"
              labelStyle={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}
              containerStyle={{ marginTop: 24, }}
              inputContainerStyle={{ borderBottomColor: 'black', borderBottomWidth: 0, borderWidth: 1, borderRadius: 15 }}
              onChangeText={(text) => this.setState({ noOfNights: text })}
              keyboardType={'number-pad'}
              value={this.state.noOfNights}
              leftIcon={
                <Icon
                  name='format-list-numbered'
                  type="material-icon"
                />
              }
            />
          </View>
        </ScrollView>
        <Button
          raised
          title="Search"
          titleStyle={{ textTransform: 'uppercase', fontSize: 21, fontWeight: 'bold', }}
          buttonStyle={{ backgroundColor: 'rgb(47, 125, 203)', borderRadius: 30, }}
          containerStyle={{ width: '80%', marginTop: 50, alignSelf: 'center', marginBottom: 10 }}
          onPress={this.searchButtonPressed.bind(this)}
          loading={this.state.loading}
          disabled={this.state.cityCode === '' || this.state.noOfAdults === '' || this.state.rooms === '' || this.state.noOfNights === ''}
        />
      </SafeAreaView>
    )
  }
}

export default (SearchHotelsScreen);