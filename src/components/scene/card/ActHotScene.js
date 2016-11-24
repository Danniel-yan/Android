import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet } from 'react-native';
import Text from 'components/shared/Text';
import {colors} from 'styles/varibles';

export default class ActHotScene extends Component {
  render(){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.actHot)

    return(
      <View style={[styles.bgColorWhite,{position:'relative'}]}>
        <View style={styles.topic}>
          <Text style={styles.topicText}>{new Date().getMonth()+1}.{new Date().getDate()}</Text>
        </View>
          <ListView
          contentContainerStyle={[styles.flexRow]}
          enableEmptySections={true}
          dataSource={dataSource}
          horizontal={true}
          renderRow={this.renderBanner}
          />
      </View>
    )
  }

  renderBanner(data){
    return(
      <View style={[styles.flexHorizontalColumn]}>
        <Image source={{uri: data.img_banner.x1}} style={styles.cardPic} />
        <Image source={{uri: data.img_banner.x2}} style={styles.cardPic} />
        <Image source={{uri: data.img_banner.x3}} style={styles.cardPic} />
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
    flexDirection: 'row'
  },
  cardPic:{
    width:220,
    height:90,
    marginLeft:5,
  },
  topic:{
    position:'absolute',
    left:-12,
    top:-5,
    zIndex:1,
    borderRadius:12,
    backgroundColor:'#ffaf32',
    padding:2
  },
  topicText:{
    color:'#fff',
    borderWidth:1,
    borderColor:'#fff',
    margin:1,
    borderRadius:12,
    paddingLeft:12,
    paddingRight:10
  }
})