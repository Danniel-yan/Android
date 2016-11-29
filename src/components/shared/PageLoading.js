import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

export default class PageLoading extends Component{
    render(){
        return(
            <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
                <Image source={require('assets/icons/init_loader.gif')} />
            </View>
        )
    }
}
