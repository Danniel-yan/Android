import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { window } from 'styles';

export default class ActDetailBannerScene extends Component {
  render(){
    const props = this.props.bannerImg;

    return(
      <View style={{marginTop:5}}>
        <TouchableOpacity onPress={()=>{ this.props.externalPushToWeb && this.props.externalPushToWeb(props.url) }}>
          <Image source={{uri: props.pic}} style={{width:window.width,height:window.width * (200 / 750)}}/>
        </TouchableOpacity>
      </View>
    )
  }
}