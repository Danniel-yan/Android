import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Image , ListView, ScrollView , TouchableOpacity} from 'react-native';

import Text from 'components/shared/Text';
import { colors } from 'styles/varibles';
import iconNext from 'assets/index-icons/icon_next.png';

import CategoryListContainer from 'containers/scene/home/CategoryListContainer';
import ActHotContainer from 'containers/scene/card/ActHotContainer';
import BankListContainer from 'containers/scene/card/BankListContainer';
import ShopNearbyContainer from 'containers/scene/card/ShopNearbyContainer'
import Dimensions from 'Dimensions';
import SceneHeader from 'components/shared/SceneHeader';
import AbstractScene from 'components/scene/AbstractScene.js';

import { ExternalPushLink } from 'containers/shared/Link';

import ScrollPagination from 'components/shared/ScrollPagination';

export default class CardScene extends AbstractScene {

  constructor(props) {
    super(props);
    this.sceneEntity = "hpg";
    this.sceneTopic = "credit_card";
    this.sceneKey = "credit_card";
  }

  render() {
    let { isPaging, pagination, paginationParams, nomore } = this.props;

    if(this.props.geoError) {
      return this._geoError();
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <SceneHeader title="办卡"/>
        <ScrollPagination
          isPaging={isPaging}
          paginationParams={paginationParams}
          pagination={pagination}
          nomore={nomore}>
            {this._renderActHot()}
            {this._renderCard()}
            {this._renderBankList()}
            {this._renderShopNearby()}
        </ScrollPagination>
      </View>
    );
  }

  _geoError() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <SceneHeader title="办卡"/>
        <ScrollView>
            {this._renderActHot()}
            {this._renderCard()}
            {this._renderBankList()}
            {this._renderShopNearby()}
        </ScrollView>
      </View>
    );
  }

  _renderActHot(){
    return(
      <View>
        <View style={[styles.title,styles.bgColorWhite, {marginTop:5}]}>
          <Text style={styles.titleLeft}>今天薅什么</Text>
          <ExternalPushLink style={styles.flexRow} toKey="ActHotListScene" title="今天薅什么">
            <Text style={styles.titleRight}>更多产品</Text>
            <Image style={styles.titleRightImg} source={iconNext} />
          </ExternalPushLink>
        </View>
        <ActHotContainer/>
      </View>
    )
  }

  _renderCard(){
    return(
      <View style={{marginTop:5}}>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>极速办卡</Text>
        </View>
        <CategoryListContainer/>
      </View>
    )
  }

  _renderBankList(){
    return(
      <View>
        <BankListContainer/>
      </View>
    )
  }

  _renderShopNearby(){
    return(
      <View style={{marginTop:5}}>
        <View style={[styles.title,styles.bgColorWhite]}>
          <Text style={styles.titleLeft}>附近优惠</Text>
        </View>
        <ShopNearbyContainer/>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  title:{
    padding:10,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
  },
  bgColorWhite:{
    backgroundColor:colors.white
  },
  titleLeft:{
    fontSize:16,
    color:colors.fontColorSecondary,
    flex:1
  },
  titleRight:{
    fontSize:14
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleRightImg:{
    width:15,
    height:15,
    marginLeft:5,
  }
})
