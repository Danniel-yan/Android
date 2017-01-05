import React, { Component } from 'react';
import {ScrollView, View, Image ,StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import paginationCardList from 'actions/scene/card/cardList'

import Text from 'components/shared/Text';
import { colors, fontSize } from 'styles/varibles';

import ScrollPagination from 'components/shared/ScrollPagination';
import { ExternalPushLink } from 'containers/shared/Link';
import { trackingScene } from 'high-order/trackingPointGenerator';

import styles from './cardStyles';

class CardListScene extends Component {

  tracking() {
    return {
      key: 'card',
      topic: 'card_list',
      name: this.props.sceneTitle
    };
  }

  render() {

    let { isPaging, pagination, paginationParams, nomore } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3'}}>
        <ScrollPagination
          isPaging={isPaging}
          paginationParams={paginationParams}
          pagination={pagination}
          nomore={nomore}>

          { this.props.cardList.map((cardList,index) =>
              <ExternalPushLink
                tracking={{key: 'card', topic: 'card_list', entity: index, id: cardList.id, card_name: cardList.name, bank_name: this.props.sceneTitle}}
                key={'key' + index }
                web={cardList.link}
                componentProps={{
                  tracking: {key: 'card', topic: 'card_application', bank_name: this.props.sceneTitle, card_name: cardList.name}
                }}
                title="申请信用卡">

                <View style={styles.carList}>
                  <Image source={{uri: cardList.pic_card}} style={styles.carLogo}/>
                  <View style={{flex: 1}}>
                    <Text style={[styles.mb5,{fontSize:fontSize.seventeen, color:colors.fontColorSecondary}]}>{cardList.name}</Text>
                    <Text style={{marginBottom:12}}>{cardList.info}</Text>
                    <Text><Text style={{color:'#ff6d17'}}>{cardList.num}</Text>人申请</Text>
                  </View>
                </View>
              </ExternalPushLink>
          )
          }
        </ScrollPagination>
      </View>
    )
  }
}

function mapStateToProps(state){
  return state.cardList
}

function mapDispatchToProps(dispatch){
  return {
    fetching: params => dispatch(paginationCardList(params)),
    pagination: params => dispatch(paginationCardList(params))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(CardListScene)))
