import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet } from 'react-native';

import {colors} from 'styles/varibles';

export default class ActHotScene extends Component {
  render(){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.bannerList)

    return(
      <View style={styles.bgColorWhite}>
        <ListView
          contentContainerStyle={styles.flexRow}
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
      <View>
        <View style={[styles.flexHorizontalColumn]}>
          <Image source={{uri: data.thumbnail}} style={styles.cardPic} />
        </View>
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
    padding:10,
    marginLeft:5,
    justifyContent: 'center',
    alignItems:'center',
  },
  cardPic:{
    width:220,
    height:90
  }
})