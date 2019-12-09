import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import SingleFlightResult from '../components/SingleFlightResult';
import firebase from 'firebase';
var config = {
  headers: {
    "x-rapidapi-host": "apidojo-hipmunk-v1.p.rapidapi.com",
    "x-rapidapi-key": "284d97e4f6msh816355ac946f4b6p1e8656jsn223f9c17887b"
  }
};
class SearchResultsScreen extends Component {
  onItemPressed(item, code, state) {
    axios.get(`https://apidojo-hipmunk-v1.p.rapidapi.com/flights/book?children=${state.noOfChildren}&pax=${state.noOfAdults}&to0=${state.toCityCode}&from0=${state.fromCityCode}&date0=${state.date}&booking_url=${code}&itin=${item.iden}`, config)
      .then(res => {
        console.log((Object.values(res.data.itins))[0])
        let itemData = (Object.values(res.data.itins))[0];
        let bookingUrl = (Object.values(itemData.booking_urls))[0]
        let flightUrl = bookingUrl.url;
        this.props.navigation.navigate('SingleFlightScreen', {
          url: flightUrl
        })
      })
      .catch(err => console.log(err))
  }
  addToFavorite(item, code, state, data) {
    console.log("add to favorite Pressed")
    const { currentUser } = firebase.auth();
    firebase.database().ref(`users/${currentUser.uid}/favorites`)
      .push({ item, code, state, data });
  }
  render() {
    let flights = this.props.navigation.getParam('data');
    let state = this.props.navigation.getParam('state');
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={flights}
          renderItem={({ item }) => {
            let bookingUrl = (Object.values(item.booking_urls))[0]
            let code = (Object.keys(item.booking_urls))[0]
            return (
              <SingleFlightResult bookingUrl={bookingUrl} onItemPressed={() => this.onItemPressed(item, code, state)} addToFavorites={() => this.addToFavorite(item, code, state, bookingUrl)} />
              // <ListItem
              //   chevron
              //   title={bookingUrl.name}
              //   rightIcon={
              //     <Icon
              //       name="heart-outlined"
              //       type="entypo"
              //     />
              //   }
              //   rightTitle={bookingUrl.price + "" + bookingUrl.booking_currency}
              //   onPress={() => this.onItemPressed(item, code, state)}
              // // onLongPress={() => this.addToFavorites(item)}
              // />
            )
          }}
          ListEmptyComponent={(<View style={{ flex: 1 }}>
            <Text>No Flights in the specified date</Text>
          </View>)}
        />
      </View>
    )
  }
}

export default SearchResultsScreen;