import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { window } from 'styles';

import WebLink from 'components/shared/WebLink'

export default class ActDetailBannerScene extends Component {
  render(){
    const props = this.props.bannerImg;

    if(props.url == undefined) return null;

    return(
      <View style={{marginTop:5}}>
        <WebLink url={props.url}>
          <Image source={{uri: props.pic}} style={{width:window.width,height:window.width * (200 / 750)}}/>
        </WebLink>
      </View>
    )
  }
}