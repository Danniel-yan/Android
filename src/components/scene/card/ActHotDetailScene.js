import React, { Component } from 'react';
import { ScrollView, View, ListView, Image , TouchableOpacity} from 'react-native';
import Text from 'components/shared/Text';
import { StyleSheet } from 'react-native';
import { colors } from 'styles/varibles';
import { window } from 'styles';

import tracker from 'utils/tracker';
import ActDetailBannerContainer from 'containers/scene/card/ActDetailBannerContainer';

import { ExternalPushLink } from 'containers/shared/Link';
import AbstractScene from 'components/scene/AbstractScene.js';

export default class ActHotDetailScene extends Component {

  constructor(props) {
    super(props);

    let bank = props.banks[0] && props.banks[0].name;
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
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.date}>活动时间：截止{props.end_date}</Text>
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

const styles = StyleSheet.create({
  bgColorWhite:{
    backgroundColor:colors.white
  },
  title:{
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
    fontSize:17,
    color:colors.fontColorSecondary
  },
  date:{
    paddingLeft:15,
    paddingBottom:15,
    fontSize:13,
    color:colors.fontColorSecondary
  },
  panelContent:{
    fontSize:14,
    color:colors.fontColorSecondary,
    paddingTop:10,
    paddingBottom:10,
    paddingRight:10
  },
  originalUrl:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    borderTopWidth:1,
    borderStyle : 'solid',
    borderTopColor: colors.line,
    paddingTop:8,
    paddingBottom:8
  }
})
