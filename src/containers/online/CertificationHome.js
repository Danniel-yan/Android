import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView
} from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import { responseStatus } from 'utils/fetch';
import NextIcon from 'components/shared/NextIcon';
import ProcessingButton from 'components/shared/ProcessingButton';
import MenuItem from 'components/shared/MenuItem';
import LoadingModal from './LoadingModal';
import onlineStyles from './styles';
import { border, fontSize, rowContainer, container, colors, centering } from 'styles';

import bankStatus, { parseStatus } from './status';

class CertificationHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    }
  }

  render() {
    let bankStatus = this.props.bankResult.status;
    let yysStatus = this.props.yysResult.status;

    let disabled = bankStatus != 0 || yysStatus != 0; 

    return (
      <ScrollView>

        {this.cardItem()}
        {this.yysItem()}

        <LoadingModal visible={this.state.submitting}/>

        <View style={styles.alert}>
          <Text style={[styles.alertText, {marginBottom: 5}]}>注：</Text>
          <Text style={styles.alertText}>1.请使用超过6个月的信用卡认证；</Text>
          <Text style={styles.alertText}>2.请使用超过3个月的手机号进行认证；</Text>
          <Text style={styles.alertText}>3.如果认证失败，可以更换其他卡号或手机号再次认证；</Text>
        </View>

        <ExternalPushLink
          toKey="OnlinePreloanSuccess"
          title="预授信申请结果"
          text="下一步"
          disabled={disabled}
          style={[onlineStyles.btn, onlineStyles.btnOffset, disabled && onlineStyles.btnDisable]}
          textStyle={onlineStyles.btnText}
          processing={this.state.submitting}
          prePress={this._submit.bind(this)}
        />
      </ScrollView>
    );
  }

  _submit() {
    this.setState({ submitting: true });

    return this.props.submitPreloan().then(response => {
      this.setState({ submitting: false });

      if(response.res == responseStatus.success) {
        return true;
      } else {
        return {key: 'OnlinePreloanFailure', title: '预授信申请结果'}
      }

      throw response.msg
    }).catch(err => {
      console.log(err);
      this.setState({ submitting: false });
      throw err;
    });
  }

  cardItem() {
    let bankStatus = this.props.bankResult.status;

    let item = (
      <MenuItem title="信用卡认证" icon={require('assets/online/icon-xyk.png')}>
        <Text style={[styles.status, this.statusStyle(bankStatus)]}>{this.statusLabel(bankStatus)}</Text>
      </MenuItem>
    );

    if(bankStatus != 0) {
      return (
        <ExternalPushLink title="信用卡认证" toKey="OnlineCreditCards">
          {item}
        </ExternalPushLink>
      );
    }

    return (
      <View>{item}</View>
    );
  }

  yysItem() {
    let yysStatus = this.props.yysResult.status;

    let item = (
      <MenuItem title="运营商认证" icon={require('assets/online/icon-yys.png')}>
        <Text style={[styles.status, this.statusStyle(yysStatus)]}>{this.statusLabel(yysStatus)}</Text>
      </MenuItem>
    );

    if(yysStatus != 0) {
      return (
        <ExternalPushLink title="运营商认证" toKey="OnlineYysForm">
          {item}
        </ExternalPushLink>
      );
    }

    return (
      <View>{item}</View>
    );
  }

  statusStyle(status) {
    if(status == 0) {
      return styles.success
    } else if(status != 1) {
      return styles.failure
    }
  }

  statusLabel(status) {
    if(status == 0) {
      return '认证通过';
    } 

    if(status == 1) {
      return '未认证';
    } 

    if(status == 6) {
      return '认证中...';
    } 

    return '认证失败';
  }
}

const styles = StyleSheet.create({
  status: {
    marginRight: 5,
    color: colors.gray,
    fontSize: fontSize.normal
  },
  success: {
    color: colors.success
  },
  failure: {
    color: colors.error
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
    yysResult: yys
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitPreloan: () => dispatch(actions.preloan),
    fetching: () => {
      dispatch(actions.bankResult());
      dispatch(actions.yysResult())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(CertificationHome)));
