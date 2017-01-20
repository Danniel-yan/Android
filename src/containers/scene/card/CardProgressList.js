import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import * as dstyles from 'styles';
import { fetchBankList} from 'actions/scene/card/bankList';
import { ExternalPushLink } from 'containers/shared/Link';
import Loading from 'components/shared/Loading';

import GroupTitle from 'components/GroupTitle';
import Bank from 'components/Bank';
import Banner from 'components/Banner';
import Button from 'components/shared/ButtonBase';
import { trackingScene } from 'high-order/trackingPointGenerator';

import fetchCardConfig from 'actions/scene/card/cardConfig';

class CardListProgress extends Component {
  tracking() {
    return {key: 'card', topic: 'btn_sec_2.1', entity: 'progress'}
  }

  render() {
    return (
      <ScrollView style={dstyles.container}>
        {this._renderBanner()}

        <GroupTitle title="可查询银行列表"/>
        {this._renderContent()}
      </ScrollView>
    )
  }

  _renderBanner() {
    let cardConfig = this.props.cardConfig.config || {};
    let banner = cardConfig.process_top_banner && cardConfig.process_top_banner[0];

    if(!banner) { return null}

    return (
      <Banner to={banner.url} image={banner.pic} height={212}/>
    );
  }

  _renderContent() {
    let banks = this.props.bankList.bankList.map((bank, index) => {
      if(!bank.process_link) { return null }

      return (
        <ExternalPushLink
          title="办卡进度"
          key={"bank"+index}
          tracking={{key: 'card', topic: 'progress_bank_list', entity: index}}
          web={bank.process_link}
          style={styles.bankItem}
          >
          <Bank name={bank.name} image={bank.pic_card}/>
        </ExternalPushLink>
      )
    })

    return (
      <View style={styles.bankList}>{banks}</View>
    );
  }

}

const styles = StyleSheet.create({
  bankList: {
    backgroundColor: '#fff',
    flexDirection:'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
});


function mapStateToProps(state) {
  return {
    cardConfig: state.cardConfig,
    bankList: state.bankList,
    isFetching: state.bankList.isFetching || state.cardConfig.isFetching,
    fetched: state.bankList.fetched && state.cardConfig.fetched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      console.log(this);
      dispatch(fetchCardConfig());
      dispatch(fetchBankList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(CardListProgress)));
