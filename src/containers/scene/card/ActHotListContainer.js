import React, { Component } from 'react';
import { View, Image ,StyleSheet,ScrollView } from 'react-native';
import Text from 'components/shared/Text';
import {colors, fontSize} from 'styles/varibles';

import { ExternalPushLink } from 'containers/shared/Link';
import AbstractScene from 'components/scene/AbstractScene';

import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchActHot } from 'actions/scene/card/actHot';

import styles from './cardStyles';

class ActHotListScene extends AbstractScene {

  constructor(props) {
    super(props);
    this.sceneEntity = "show_list";
    this.sceneKey = "card";
    this.sceneTopic = "promotion";
  }

  render() {

    const props = this.props.actHot;

    return(
      <ScrollView style={{backgroundColor: '#f3f3f3'}}>
        {
          props.map((props, index) =>
              <ExternalPushLink
                tracking={{key: 'card', topic: 'promotion_list', entity: index, event: 'clk', title: props.title, bank_name: props.banks[0].name}}
                key={'key' + index}
                title="活动详情"
                toKey="ActHotDetailScene"
                componentProps={{fetchingParams:props.id}}>
                <View style={styles.list}>
                  <Image source={{uri: props.img_list.x3}} style={styles.actLogo}/>
                  <View style={{flex:1}}>
                    <Text style={[styles.mb10,{color:colors.fontColorSecondary, fontSize:fontSize.seventeen}]}>{props.title}</Text>
                    <Text style={[styles.mb10,{color:colors.fontColorSecondary, fontSize:fontSize.thirteen}]}>{props.banks[0].name}</Text>
                    <Text style={{fontSize:fontSize.thirteen}}>{(props.start_date).substr(0,10)}至{(props.end_date).substr(0,10)}</Text>
                  </View>
                </View>
              </ExternalPushLink>
          )
        }
      </ScrollView>
    )

  }
}

function mapStateToProps(state){
  return state.actHot
}

function mapDispatchToProps(dispatch){
  return {
    fetching : num => dispatch(fetchActHot( num = 20 ))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading, ActHotListScene));
