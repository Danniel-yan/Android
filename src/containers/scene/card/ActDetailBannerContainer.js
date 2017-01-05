import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { window } from 'styles';

import { ExternalPushLink } from 'containers/shared/Link';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';
import { externalPush } from 'actions/navigation';

import { fetchActDetailBanner } from 'actions/scene/card/actDetailBanner';


class ActDetailBannerScene extends Component {

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

function mapStateToProps(state) {
  return state.actDetailBanner;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchActDetailBanner()),
    externalPushToWeb: (url) => dispatch(externalPush({key: url, web: url}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ActDetailBannerScene));
