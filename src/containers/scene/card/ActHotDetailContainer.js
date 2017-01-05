import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, ListView, Image , TouchableOpacity} from 'react-native';
import Text from 'components/shared/Text';
import { window } from 'styles';

import tracker from 'utils/tracker';
import ActDetailBannerContainer from 'containers/scene/card/ActDetailBannerContainer';

import { ExternalPushLink } from 'containers/shared/Link';

import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';
import { externalPush } from 'actions/navigation';

import { fetchActHotDetail } from 'actions/scene/card/actHotDetail';

import styles from './cardStyles';

class ActHotDetailScene extends Component {

  constructor(props) {
    super(props);

    let bank = props.detail.banks[0] && props.detail.banks[0].name;
    tracker.trackAction({
      key: 'card',
      entity: 'detail',
      topic: 'promotion',
      event: 'landing',
      title: props.title,
      bank_name: bank
    });
  }

  render(){
    const props = this.props.detail;

    return(
      <ScrollView style={{backgroundColor: '#f3f3f3'}}>
        <View style={styles.bgColorWhite}>
          <Image source={{uri: props.top_banner}} style={{width:window.width,height:window.width * (320 / 750)}}/>
          <Text style={styles.detailTitle}>{props.title}</Text>
          <Text style={styles.detailDate}>活动时间：截止{(props.end_date).substr(0,10)}</Text>
        </View>

        <View style={[styles.bgColorWhite,{marginTop:5,paddingLeft:15}]}>
          <View>
            <Text style={styles.panelContent}>{props.content}</Text>
          </View>
          {this.renderOriginalUrl(props.original_url)}

        </View>

        <ActDetailBannerContainer/>

      </ScrollView>
    )
  }

  renderOriginalUrl(url){
    if(url == undefined) return null;
    return(
      <ExternalPushLink web={url}>
        <View style={styles.originalUrl}>
          <Text style={{flex:1}}>查看原文</Text>
          <View style={{flexDirection: 'row',alignItems: 'center',paddingRight:15}}>
            <Image source={require('assets/index-icons/icon_next.png')}/>
          </View>
        </View>
      </ExternalPushLink>
    )
  }
}

function mapStateToProps(state) {
  return state.actHotDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: id => dispatch(fetchActHotDetail(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, ActHotDetailScene));
