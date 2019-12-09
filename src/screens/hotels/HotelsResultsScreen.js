import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

var config = {
  headers: {
    "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
    "x-rapidapi-key": "284d97e4f6msh816355ac946f4b6p1e8656jsn223f9c17887b"
  }
};
class HotelsResultsScreen extends Component {
  onItemPressed(code) {
    axios.get(`https://tripadvisor1.p.rapidapi.com/hotels/get-details?location_id=${code}`, config)
      .then(res => {
        let flightUrl = res.data.data;
        this.props.navigation.navigate('SingleHotel', {
          url: flightUrl[0].web_url
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    let hotels = this.props.navigation.getParam('data');
    // let state = this.props.navigation.getParam('state');
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={hotels}
          renderItem={({ item }) => {
            return (
              <ListItem
                chevron
                title={item.subcategory_type_label + " " + item.name}
                titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
                rightTitleStyle={{ fontSize: 14 }}
                rightTitle={item.price}
                subtitle={item.ranking}
                subtitleStyle={{ fontSize: 12 }}
                rightSubtitle={"rating: " + item.rating}
                onPress={() => this.onItemPressed(item.location_id)}
              />
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

export default HotelsResultsScreen;