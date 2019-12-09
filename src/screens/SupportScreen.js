import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';



class SupportScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 40 }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>Support</Text>
            <View style={{ flex: 1, marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '900' }}>Contact us</Text>
              <View style={{ flexDirection: 'row', marginTop: 14 }}>
                <Text>Email: </Text>
                <Text>support@jetout.com </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text>Phone: </Text>
                <Text>+490000101010 </Text>
              </View>

            </View>
          </View>

        </ScrollView>
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

export default SupportScreen