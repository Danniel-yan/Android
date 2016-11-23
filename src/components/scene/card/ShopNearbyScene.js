
import React, { Component } from 'react';
import { View, ListView , StyleSheet, Image , TouchableOpacity } from 'react-native';

import { colors } from 'styles/varibles';
import Dimensions from 'Dimensions'
import * as defaultStyle from 'styles';

import Text from 'components/shared/Text'

import iconNext from 'assets/index-icons/icon_next.png';
import triangleDown from 'assets/icons/triangle-down.png';

export default class ShopNearbyScene extends Component {

  render(){

    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(this.props.shopNearby)

    return(
      <ListView
        contentContainerStyle={styles.flexColumn}
        enableEmptySections={true}
        dataSource={dataSource}
        renderRow={this.renderShopNearby}
        />
    )
  }

  renderShopNearby(data){
    return(
      <View>
        <View style={[styles.flexContainerRow,styles.bgColorWhite,{marginTop:5}]}>
          <Image source={{uri: data.logo_url}} style={styles.cardPic} />
          <View style={styles.rightContainer}>
            <Text style={styles.rightContainerTitle}>{data.shop_name}</Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={[styles.rightContainerSubTitle,{fontSize:13}]}>{parseFloat(data.dis).toFixed(2)} 米</Text>
              </View>
              <TouchableOpacity style={[styles.flexEnd]} onPress={() => {}}>
                <Text style={{fontSize:13}}>有{data.act.length}条活动</Text>
                <View style={{position:'absolute',right:-10,top:7}}>
                  <Image source={triangleDown}/>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {data.act.map((act,index) => {
          return  (
            <View key={'key' + index} style={[styles.flexContainerRow,styles.bgColorWhite,styles.act]}>
              <View style={(act.discount[0].name_en == 'decrease_price') ? styles.decrease_price : styles.discount }>
                <Text style={{color:'#fff'}}>{act.discount[0].name}</Text>
              </View>
              <View>
                <Text>{act.title}</Text>
              </View>
              <View style={[styles.flexEnd,{marginTop:5}]}>
                <Image source={iconNext} />
              </View>
            </View>
          )
        })}

      </View>
    )
  }

}

const styles = StyleSheet.create({
  bgColorWhite:{
    backgroundColor:colors.white
  },
  flexColumn:{
    flex : 1,
    flexDirection: 'column'
  },
  cardPic:{
    width:40,
    height:40,
    borderWidth:1,
    borderColor: colors.line
  },
  flexContainerRow:{
    flexDirection: 'row',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor: colors.line
  },
  rightContainer : {
    paddingLeft : 10,
    position:'relative',
    width:Dimensions.get('window').width - 80
  },
  rightContainerTitle:{
    fontSize:17,
    color:colors.fontColorSecondary,
    marginBottom:6
  },
  rightContainerSubTitle:{
    fontSize:14,
    marginBottom:6
  },
  decrease_price:{
    backgroundColor:'#ffaf32',
    marginRight:5,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:2
  },
  discount:{
    backgroundColor:'#ef6c6c',
    marginRight:5,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:2
  },
  flexEnd:{
    flex: 1,
    alignItems:'flex-end',
    position:'relative'
  },
  act:{
    paddingLeft:10,
    paddingRight:10,
    paddingTop:20,
    paddingBottom:20
  }
})