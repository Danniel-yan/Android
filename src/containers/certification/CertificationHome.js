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

const statusLabels = {
  success: '认证成功',
  failure: '认证失败',
  none: '未认证',
  expire: '认证过期',
  progressing: '认证中...'
}

class CertificationHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      fetching: true
    }
  }

  componentDidMount() {
    this.props.fetching && this.props.fetching();
    this.setState({fetching: false});
  }

  render() {
    let bank = this.props.bankResult.status;
    let yys = this.props.yysResult.status;

    let disabled = !(bank == 'success' && yys == 'success');

    return this.state.fetching || this.props.bankResult.isFetching || this.props.yysResult.isFetching ? <Loading /> : (
      <ScrollView>

        {this.cardItem()}
        {this.yysItem()}

        <LoadingModal visible={this.state.submitting}/>

        <View style={styles.alert}>
          <Text style={[styles.alertText, {marginBottom: 5}]}>注：</Text>
          <Text style={styles.alertText}>1.请使用超过6个月的信用卡认证；</Text>
          <Text style={styles.alertText}>2.请使用超过6个月的手机号进行认证；</Text>
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
      this.setState({ submitting: false });
      throw err;
    });
  }

  cardItem() {
    let status = this.props.bankResult.status;

    let item = (
      <MenuItem title="信用卡认证" icon={require('assets/online/icon-xyk.png')}>
        <Text style={[styles.status, styles[status]]}>{statusLabels[status]}</Text>
      </MenuItem>
    );

    if(['success', 'progressing'].includes(status)) {
      return item;
    }

    return (
      <ExternalPushLink title="信用卡认证" toKey="OnlineCreditCards">
        {item}
      </ExternalPushLink>
    );
  }

  yysItem() {
    let status = this.props.yysResult.status;

    let item = (
      <MenuItem title="运营商认证" icon={require('assets/online/icon-yys.png')}>
        <Text style={[styles.status, styles[status]]}>{statusLabels[status]}</Text>
      </MenuItem>
    );

    if(['success', 'progressing'].includes(status)) {
      return item;
    }

    return (
      <ExternalPushLink title="运营商认证" toKey="OnlineYysForm">
        {item}
      </ExternalPushLink>
    )
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
  expire: {
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
    submitPreloan: () => dispatch(actions.preloan()),
    fetching: () => {
      dispatch(actions.bankResult());
      dispatch(actions.yysResult());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  trackingScene(CertificationHome)
);
