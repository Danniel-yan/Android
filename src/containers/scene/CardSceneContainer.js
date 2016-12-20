import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Image , ListView, ScrollView , TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

import { majorPush, majorPop } from 'actions/navigation';
import externalScene from 'high-order/externalScene';
import paginationShopNearby from 'actions/scene/card/shopNearby'

import Text from 'components/shared/Text';
import { border, container, rowContainer, centering, colors, responsive, textVerticalCenter } from 'styles';
import iconNext from 'assets/index-icons/icon_next.png';

import BankListContainer from 'containers/scene/card/BankListContainer';
import ShopNearbyContainer from 'containers/scene/card/ShopNearbyContainer'
import Dimensions from 'Dimensions';
import SceneHeader from 'components/shared/SceneHeader';
import Banner from 'components/Banner';
import fetchCardConfig from 'actions/scene/card/cardConfig';

import { ExternalPushLink } from 'containers/shared/Link';

import ScrollPagination from 'components/shared/ScrollPagination';
import { trackingScene } from 'high-order/trackingPointGenerator';

class CardScene extends Component {
  tracking = 'card';

  componentDidMount() {
    let cardConfig = this.props.cardConfig;

    if(!cardConfig.isFetching && !cardConfig.fetched && !cardConfig.err) {
      this.props.fetchingCardConfig();
    }

  }

  render() {
    let { cardConfig, isPaging, pagination, paginationParams, nomore } = this.props;

    if(this.props.geoError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
          <SceneHeader title="办卡"/>
          <ScrollView>
            {this._children()}
          </ScrollView>
        </View>
      );
    }


    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <SceneHeader title="办卡"/>
        <ScrollPagination
          isPaging={isPaging}
          paginationParams={paginationParams}
          pagination={pagination}
          nomore={nomore}>

          {this._children()}
        </ScrollPagination>
      </View>
    );
  }

  _children() {
    let cardConfig = this.props.cardConfig.config;
    let banner = cardConfig.tab_top_banner && cardConfig.tab_top_banner[0];

    return (
      <View>
        { !banner ? null : <Banner to={banner.url} image={banner.pic} height={176}/>}
        {this._renderCard()}
        {this._renderBankList()}
        {this._renderShopNearby()}
      </View>
    )
  }

  _renderCard(){
    let category = this.props.cardConfig.config.tab_category_hot;

    return(
      <View style={[cardEnterStyle.wrap ,styles.bgColorWhite]}>

        <View style={cardEnterStyle.left}>
        { !category ? null :
        <ExternalPushLink style={centering}>
          <Image source={{uri: category.pic}} style={cardEnterStyle.boxPic} />
          <Text style={cardEnterStyle.categoryTitle}>{category.name}</Text>
          <Text>{category.info}</Text>

        </ExternalPushLink>
        }
        </View>

        <View style={container}>

          <ExternalPushLink
            style={[rowContainer, centering, cardEnterStyle.rowGroup]}>
            <Text style={[cardEnterStyle.title, {color: '#1A91FE'}]}>办卡进度</Text>
            <Image source={require('assets/card/jindu.png')}/>
          </ExternalPushLink>

          <ExternalPushLink
            style={[rowContainer, centering, cardEnterStyle.rowGroup]}>
            <Text style={[cardEnterStyle.title, {color: colors.secondary}]}>办卡攻略</Text>
            <Image source={require('assets/card/gonglue.png')}/>
          </ExternalPushLink>

        </View>
      </View>
    )
  }

  _renderBankList(){
    return(
      <View style={[styles.bgColorWhite, {marginTop:5}]}>
        <View style={[styles.title,]}>
          <Text style={styles.titleLeft}>极速办卡</Text>
        </View>
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
    ...border('bottom')
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

function mapStateToProps(state) {
  return {
    ...state.shopNearby,
    cardConfig: state.cardConfig
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchingCardConfig: () => dispatch(fetchCardConfig()),
    fetching : offset => dispatch(paginationShopNearby(offset)),
    pagination: offset => dispatch(paginationShopNearby(offset))
  }
}

const cardEnterStyle = StyleSheet.create({
  rowGroup: {
    ...border('bottom')
  },

  wrap: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: responsive.width(311),
  },

  title: {
    marginRight: responsive.width(96),
    fontSize: 17,
  },

  left: {
    ...border('right'),
    width: responsive.width(332),
    justifyContent: 'center',
    alignItems:'center',
  },

  boxPic: {
    width: responsive.width(200),
    height: responsive.width(125),
  },

  categoryTitle: {
    ...textVerticalCenter(responsive.height(68)),
    fontSize:17,
    color:colors.fontColorSecondary,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(CardScene));
