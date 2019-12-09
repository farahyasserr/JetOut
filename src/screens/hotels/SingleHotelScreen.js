import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
class SingleHotelScreen extends Component {
  render() {
    let hotelUrl = this.props.navigation.getParam('url');
    return (
      <WebView
        source={{ uri: hotelUrl }}
        startInLoadingState
        useWebKit={true}
      />
    )
  }
}
export default (SingleHotelScreen);