import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
class SingleFlight extends Component {
  render() {
    let flightUrl = this.props.navigation.getParam('url');
    return (
      <WebView
        source={{ uri: flightUrl }}
        startInLoadingState
        useWebKit={true}
      />
    )
  }
}
export default (SingleFlight);