import React, { Component } from 'react';
import { ListItem, Icon } from 'react-native-elements';
class SingleFlightResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false
    }
  }
  render() {
    let { bookingUrl } = this.props;
    return (
      <ListItem
        chevron
        title={bookingUrl.name}
        rightIcon={
          this.props.noIcon ? null :
            <Icon
              name={this.state.favorite ? 'heart' : "heart-outlined"}
              type="entypo"
              color={this.state.favorite ? 'red' : "black"}
              onPress={() => {
                this.props.addToFavorites()
                this.setState({ favorite: true })
              }}
            />
        }
        rightTitle={bookingUrl.price + "" + bookingUrl.booking_currency}
        onPress={this.props.onItemPressed}
      // onLongPress={() => {

      // }}
      />
    )
  }
}

export default (SingleFlightResult);