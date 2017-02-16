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
    let bankResult = this.props.bankResult, yysResult = this.props.yysResult, gjjResult = this.props.gjjResult,
      loanType = this.props.loanType;

    var enable = yysResult.status == 'success';
      enable = loanType == 1 ? enable && bankResult.status == 'success' : enable && gjjResult.status == 'success';

    return this.state.fetching || this.props.isFetching ? <Loading /> : (
      <ScrollView>

        {this.cardItem()}
        {this.gjjItem()}
        {this.yysItem()}

        <LoadingModal visible={this.state.submitting}/>

        {this.descriptionItem()}

        <ExternalPushLink
          toKey="OnlinePreloanSuccess"
          title="预授信申请结果"
          text="下一步"
          disabled={!enable}
          style={[onlineStyles.btn, onlineStyles.btnOffset, !enable && onlineStyles.btnDisable]}
          textStyle={onlineStyles.btnText}
          processing={this.state.submitting}
          prePress={this._submit.bind(this)}
          backRoute={{key: 'LoanDetailScene'}}
        />
      </ScrollView>
    );
  }

  _submit() {
    this.setState({ submitting: true });

    // // Test POP Navigation
    // this.setState({ submitting: false });
    // return true;

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
    if(!this.props.bankResult) return null;

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

  gjjItem() {
    if(!this.props.gjjResult) return null;

    let status = this.props.gjjResult.status;

    let item = (
      <MenuItem title="公积金认证" icon={require('assets/online/icon-gjj.png')}>
        <Text style={[styles.status, styles[status]]}>{statusLabels[status]}</Text>
      </MenuItem>
    );

    if(['success', 'progressing'].includes(status)) {
      return item;
    }

    return (
      <ExternalPushLink title="公积金认证" toKey="FundLogin">
        {item}
      </ExternalPushLink>
    )
  }

  yysItem() {
    if(!this.props.yysResult) return null;

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

  descriptionItem() {
    return this.props.gjjResult ? (
      <View style={styles.alert}>
        <Text style={[styles.alertText, {marginBottom: 5}]}>注：</Text>
        <Text style={styles.alertText}>1.请使用连续缴纳6个月的公积金帐号进行认证；</Text>
        <Text style={styles.alertText}>2.请使用超过6个月的手机号进行认证；</Text>
        <Text style={styles.alertText}>3.如果认证失败，可以更换其他本人卡号或手机号再次认证；</Text>
      </View>
    ) : (
      <View style={styles.alert}>
        <Text style={[styles.alertText, {marginBottom: 5}]}>注：</Text>
        <Text style={styles.alertText}>1.请使用超过6个月的信用卡认证；</Text>
        <Text style={styles.alertText}>2.请使用超过6个月的手机号进行认证；</Text>
        <Text style={styles.alertText}>3.如果认证失败，可以更换其他卡号或手机号再次认证；</Text>
      </View>
    );
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
  var loanType = state.online.loanType.type;

  let bank = state.online.bankResult;
  let yys = state.online.yysResult;
  let gjj = state.online.gjjResult;

  return loanType == 1 ? {
    isFetching: bank.isFetching || yys.isFetching,
    fetched: bank.fetched && yys.fetched,
    bankResult: bank,
    yysResult: yys,
    loanType: loanType
  } : {
    isFetching: gjj.isFetching || yys.isFetching,
    fetched: gjj.fetched && yys.fetched,
    gjjResult: gjj,
    yysResult: yys,
    loanType: loanType
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    submitPreloan: () => dispatch(actions.preloan()),
    fetching: () => {
      dispatch(actions.gjjResult());
      dispatch(actions.bankResult());
      dispatch(actions.yysResult());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  trackingScene(CertificationHome)
);
