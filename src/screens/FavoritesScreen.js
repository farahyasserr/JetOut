import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import SingleFlightResult from '../components/SingleFlightResult';
import axios from 'axios';
var config = {
  headers: {
    "x-rapidapi-host": "apidojo-hipmunk-v1.p.rapidapi.com",
    "x-rapidapi-key": "284d97e4f6msh816355ac946f4b6p1e8656jsn223f9c17887b"
  }
};
class FavoritesScreen extends Component {
  onItemPressed(item, code, state) {
    axios.get(`https://apidojo-hipmunk-v1.p.rapidapi.com/flights/book?children=${state.noOfChildren}&pax=${state.noOfAdults}&to0=${state.toCityCode}&from0=${state.fromCityCode}&date0=${state.date}&booking_url=${code}&itin=${item.iden}`, config)
      .then(res => {
        console.log((Object.values(res.data.itins))[0])
        let itemData = (Object.values(res.data.itins))[0];
        let bookingUrl = (Object.values(itemData.booking_urls))[0]
        let flightUrl = bookingUrl.url;
        this.props.navigation.navigate('SingleFavorite', {
          url: flightUrl
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    let data = this.props.navigation.getParam('data');
    console.log(data)
    return (
      <View style={{ flex: 1 }}>
        < FlatList
          data={(data !== null && data !== undefined) ? Object.values(data) : []}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <SingleFlightResult bookingUrl={item.data} onItemPressed={() => this.onItemPressed(item.item, item.code, item.state)} noIcon={true}/>
            )
          }}
          ListEmptyComponent={(<View style={{ flex: 1 }}>
            <Text>No Flights in the specified date</Text>
          </View>)}
        />
        {/* <Text>No Favorites</Text> */}
      </View>
    )
  }
}

export default (FavoritesScreen);