import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet } from 'react-native';
import Text from 'components/shared/Text';
import {colors} from 'styles/varibles';

import { ExternalPushLink } from 'containers/shared/Link';

import dateBackground from 'assets/icons/date_background.png'

import Dimensions from 'Dimensions';

export default class ActHotScene extends Component {
  render(){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.actHot)

    return(
      <View style={[styles.bgColorWhite,{position:'relative'}]}>
        <Image style={styles.topic} source={dateBackground} >
          <Text style={styles.topicText}>{new Date().getMonth()+1}.{new Date().getDate()}</Text>
        </Image>

        <ListView
        contentContainerStyle={[styles.flexRow]}
        enableEmptySections={true}
        dataSource={dataSource}
        horizontal={true}
        renderRow={this.renderBanner}
        showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }

  renderBanner(data){
    return(
      <View style={[styles.flexHorizontalColumn]}>
        <ExternalPushLink
          tracking={{key: 'card', topic: 'Rotation', entity: 'Promotions', event: 'click'}}
          title="活动详情"
          toKey="ActHotDetailScene"
          componentProps={{fetchingParams: { id: data.id }}}>
          <Image source={{uri: data.img_banner.x3}} style={styles.cardPic}>
            <Text style={[styles.bankName,{color:'#' + data.font_color}]}>{data.banks[0].name}</Text>
            <Text style={[styles.title,{color:'#' + data.font_color}]}>{data.title}</Text>
          </Image>
        </ExternalPushLink>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bgColorWhite:{
    backgroundColor:colors.white
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexHorizontalColumn:{
    paddingBottom:10,
    flexDirection: 'row',
    marginTop:8
  },
  cardPic:{
    width:220,
    height:95,
    marginLeft:10,
    flex: 1,
    alignItems:'flex-start',
  },
  topic:{
    width:42,
    height:19,
    backgroundColor:'transparent',
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    zIndex:1
  },
  topicText:{
    color:'#fff',
  },
  bankName:{
    marginLeft:10,
    width:Dimensions.get('window').width/2 - 20,
    fontSize:17,
    marginBottom:8,
    marginTop:15,
    backgroundColor:'transparent'
  },
  title:{
    marginLeft:10,
    width:Dimensions.get('window').width/2 - 20,
    fontSize:12,
    backgroundColor:'transparent'
  }
})
