import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import NextIcon from 'components/shared/NextIcon';
import MenuItem from 'components/shared/MenuItem';
import { border, fontSize, rowContainer, container, colors, centering } from 'styles';

import bankStatus from './status';

class CertificationHome extends Component {
  render() {

    return (
      <ScrollView>
        <ExternalPushLink
          title="信用卡认证"
          toKey="OnlineCreditCards">
          <MenuItem title="信用卡认证" icon={require('assets/online/icon-xyk.png')}>
            <Text style={[styles.status, styles[this.props.status]]}>{bankStatus[this.props.bankResult.status]}</Text>
          </MenuItem>
        </ExternalPushLink>

        <ExternalPushLink
          title="运营商认证"
          >
          <MenuItem title="运营商认证" icon={require('assets/online/icon-yys.png')}>
            <Text style={[styles.status, styles[this.props.status]]}>{bankStatus[this.props.yysResult.status]}</Text>
          </MenuItem>
        </ExternalPushLink>

        <View style={styles.alert}>
          <Text style={[styles.alertText, {marginBottom: 5}]}>注：</Text>
          <Text style={styles.alertText}>1.请使用超过6个月的信用卡认证；</Text>
          <Text style={styles.alertText}>2.请使用超过3个月的手机号进行认证；</Text>
          <Text style={styles.alertText}>3.如果认证失败，可以更换其他卡号或手机号再次认证；</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    marginRight: 5,
    color: colors.gray,
    fontSize: fontSize.normal
  },
  alert: {
    padding: 10
  },
  alertText: {
    lineHeight: 20,
    fontSize: fontSize.normal,
    color: colors.grayDark
  }
});



import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import actions from 'actions/online';

function mapStateToProps(state) {
  let bank = state.online.bankResult;
  let yys = state.online.yysResult;

  return {
    isFetching: bank.isFetching || yys.isFetching,
    fetched: bank.fetched && yys.fetched,
    bankResult: bank,
    yysResult: yys,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {dispatch(actions.bankResult()); dispatch(actions.yysResult())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(CertificationHome)));
