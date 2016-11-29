import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

export default class Loading extends Component{
  render(){
    return(
      <View style={styles.loading}>
        <Image source={require('assets/icons/mini_loader.gif')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:20,
    paddingTop:20
  }
})
