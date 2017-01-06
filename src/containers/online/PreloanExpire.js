import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import { container, colors, fontSize, centering} from 'styles';
import onlineStyles from './styles';
import Banner from './Banner';

function PreloanExpire(props) {
  let data = props.data;

  return (
    <ScrollView>
      <Banner
        icon={require('assets/online/info.png')}
        text={"抱歉，您的预授信额度已过期\n如需要，请重新申请"}
      />

      <Text style={styles.header}>预授信详情</Text>

      <View style={styles.item}>
        <Text style={[styles.text, container]}>预受额度：</Text>
        <Text style={styles.text}>{data.sug_loan_amount}</Text>
      </View>

      <View style={styles.item}>
        <Text style={[styles.text, container]}>借款期限：</Text>
        <Text style={styles.text}>{data.sug_term}期</Text>
      </View>

      <View style={styles.item}>
        <Text style={[styles.text, container]}>预授费率</Text>
        <Text style={styles.text}>{data.interest_down}-{data.interest_up}</Text>
      </View>

      <ExternalPushLink
        title="信息认证"
        style={[onlineStyles.btn, {marginHorizontal: 10, marginTop: 80}]}
        textStyle={onlineStyles.btnText}
        toKey="OnlineUserInfo"
        text="重新申请"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#f1f1f1',
    color: colors.gray
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  text: {
    fontSize: fontSize.large,
    color: colors.grayDark
  }
});



import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return state.online.preloanStatus;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(actions.preloanStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(PreloanExpire)));
