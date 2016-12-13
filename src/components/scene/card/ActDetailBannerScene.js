import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { window } from 'styles';

import { ExternalPushLink } from 'containers/shared/Link';

export default class ActDetailBannerScene extends Component {
  render(){
    const props = this.props.bannerImg;

    if(props.url == undefined) return null;

    return(
      <View style={{marginTop:5}}>
        <ExternalPushLink web={props.url}>
          <Image source={{uri: props.pic}} style={{width:window.width,height:window.width * (200 / 750)}}/>
        </ExternalPushLink>
      </View>
    )
  }
}
