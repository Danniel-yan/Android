import React, { Component } from 'react';
import { View, Image ,StyleSheet,ScrollView } from 'react-native';
import Text from 'components/shared/Text';
import {colors} from 'styles/varibles';

import { ExternalPushLink } from 'containers/shared/Link';
import AbstractScene from 'components/scene/AbstractScene.js';

export default class ActHotListScene extends AbstractScene {

  constructor(props) {
    super(props);
    this.sceneEntity = "Promotions";
    this.sceneKey = "Promotions";
    this.sceneTopic = "Promotions";
  }

  render() {

    const props = this.props.actHot;

    return(
      <ScrollView style={{backgroundColor: '#f3f3f3'}}>
        {
          props.map((props, index) =>
          <ExternalPushLink
            tracking={{key: 'Promotions', topic: 'Pro_list', entity: props.id, event: 'click'}}
            key={'key' + index}
            title="活动详情"
            toKey="ActHotDetailScene"
            componentProps={{fetchingParams: { id: props.id }}}>
              <View style={styles.list}>
                <Image source={{uri: props.img_list.x1}} style={styles.logo}/>
                <View style={{flex:1}}>
                  <Text style={styles.title}>{props.title}</Text>
                  <Text style={styles.bankName}>{props.banks[0].name}</Text>
                  <Text style={styles.date}>{(props.start_date).substr(0,10)}至{(props.end_date).substr(0,10)}</Text>
                </View>
              </View>
            </ExternalPushLink>
          )
        }
      </ScrollView>
    )

  }
}

const styles = StyleSheet.create({
  list:{
    backgroundColor:'#fff',
    margin:5,
    padding:10,
    flexDirection: 'row',
    borderRadius:5
  },
  logo:{
    width:80,
    height:80,
    marginRight:15
  },
  title:{
    color:'#333',
    fontSize:17,
    marginBottom:10
  },
  bankName:{
    fontSize:13,
    marginBottom:10,
    color:'#333'
  },
  date:{
    fontSize:13
  }
})
