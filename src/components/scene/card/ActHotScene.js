import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet } from 'react-native';
import Text from 'components/shared/Text';
import {colors} from 'styles/varibles';

export default class ActHotScene extends Component {
  render(){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.bannerList)


    return(
      <View style={[styles.bgColorWhite,{position:'relative'}]}>
        <View style={{position:'absolute',left:-10,top:-5,zIndex:1,borderRadius:10,backgroundColor:'#ffaf32',paddingLeft:15,paddingRight:10}}>
          <Text style={{color:'#fff'}}>{new Date().getMonth()+1}.{new Date().getDate()}</Text>
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
    console.log(data.img_banner)
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
  }
})