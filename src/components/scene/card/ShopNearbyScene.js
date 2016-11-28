
import React, { Component } from 'react';
import { View, ListView , StyleSheet, Image , TouchableOpacity, TouchableHighlight, RefreshControl } from 'react-native';

import { colors } from 'styles/varibles';
import Dimensions from 'Dimensions'
import * as defaultStyle from 'styles';

import Text from 'components/shared/Text'

import iconNext from 'assets/index-icons/icon_next.png';
import triangleDown from 'assets/icons/triangle-down.png';
import triangleUp from 'assets/icons/triangle-up.png';

export default class ShopNearbyScene extends Component {

  state = {
    isFetching: this.props.isFetching
  }

  render() {

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.shopNearby)

    return (
      <ListView
        enableEmptySections={true}
        dataSource={dataSource}
        renderRow={this.renderShopNearbyList}
        />
    )
  }

  renderShopNearbyList(data){
    return(
      <View style={styles.flexColumn}>
        <List {...data}/>
      </View>
    )
  }
}

class List extends Component {
  state = {
    isShow: false
  }

  render(){
    let props = this.props;
    return(
      <View>
        <View style={[styles.flexContainerRow,styles.bgColorWhite,{marginTop:5}]}>
          <Image source={{uri: props.logo_url}} style={styles.cardPic} />
          <View style={styles.rightContainer}>
            <Text style={styles.rightContainerTitle}>{props.shop_name}</Text>
            <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <Text style={[styles.rightContainerSubTitle,{fontSize:13}]}>{parseFloat(props.dis).toFixed(2)} 米</Text>
              </View>

              {this.renderLength(props)}

            </View>

          </View>
        </View>

        {this.renderTriangle(props)}

      </View>
    )
  }
  renderLength(props){

    if(props.act.length == 0) return null

    return(
      <TouchableOpacity style={{flexDirection: 'row',alignItems:'center'}} onPress={()=>{this.setState({ isShow: !this.state.isShow})}}>
        <View>
          <Text style={{fontSize:13}}>有{props.act.length}条活动</Text>
        </View>
        <View style={{alignItems: 'flex-end',marginLeft:5}}>
          <Image source={this.state.isShow ? triangleUp : triangleDown} />
        </View>
      </TouchableOpacity>
    )
  }
  renderTriangle(props){

    if(this.state.isShow ) { return null }
    return(
      <View>
        {
          props.act.map((act,index) =>
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
        }
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
  act:{
    paddingLeft:10,
    paddingRight:10,
    paddingTop:20,
    paddingBottom:20
  }
})