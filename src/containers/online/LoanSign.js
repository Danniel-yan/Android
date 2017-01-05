import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

import Button from 'components/shared/ButtonBase';
import Checkbox from 'components/shared/Checkbox';
import L2RItem from './L2RItem';
import NextIcon from 'components/shared/NextIcon';
import { post, responseStatus } from 'utils/fetch';
import { ExternalPushLink } from 'containers/shared/Link';
import { flexRow, container, colors, fontSize, border } from 'styles'
import { l2rStyles } from './styles';


import SubmitButton from './SubmitButton';

class LoanSign extends Component {
  state = {
    card: '',
    checkedAgreement: true
  }

  render() {
    let userInfo = this.props.userInfo;
    let loan = this.props.resultdata;
    let service = loan.repayPlanResults[0];
    let plan = loan.repayPlanResults.slice(1);

    return (
      <ScrollView>
        <View style={styles.content}>
          <L2RItem left="姓名" right={userInfo.person_name} />
          <L2RItem left="身份证号" right={userInfo.id_no} />

          <L2RItem style={styles.amount} left="合同金额" right={loan.approve_amount} >
            <Text style={styles.amountTip}>
              本次借款手续费为{service.repayAmount}元，到手金额为{(loan.approve_amount - service.repayAmount).toFixed(2)}元
            </Text>
          </L2RItem>

          <L2RItem left="借款期限" right={loan.sug_term} />
          <L2RItem left="月服务费率" right={loan.month_fee} />

          <ExternalPushLink
            toKey="OnlineTrialRefundPlan"
            title="还款计划"
            componentProps={{plans: plan}}
            >
            <L2RItem left="还款计划" right="">
              <NextIcon/>
            </L2RItem>
          </ExternalPushLink>

          <ExternalPushLink
            toKey="OnlineReceiptCard"
            title="添加银行卡"
            componentProps={{ onSuccess: value => this.setState({ card: value }) }}
            >
            <L2RItem left="收款银行卡" right={this.state.card} >
              <NextIcon/>
            </L2RItem>
          </ExternalPushLink>
        </View>

        <View style={styles.textRow}>
          <Button
            style={styles.agreement}
            onPress={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}>
            <Checkbox
              onChange={() => this.setState({checkedAgreement: !this.state.checkedAgreement})}
              checked={this.state.checkedAgreement}
              style={{marginRight: 5}}
            />
            <Text style={styles.checkboxTxt}>我已阅读并同意</Text>
            <ExternalPushLink
              web="lkjlkj"
              text="《借款咨询服务协议》"
              title="借款咨询服务协议"
              textStyle={styles.checkboxTxt}
            />
            <Text style={styles.checkboxTxt}>相关条款</Text>
          </Button>
        </View>

        {
          this.state.error && (<Text style={styles.error}>{this.state.error}</Text>)
        }

        <SubmitButton
          processing={this.state.submitting}
          disabled={!(this.state.card && this.state.checkedAgreement)}
          prePress={this._submit.bind(this)}
          toKey="OnlineSignSuccess"
          title="签约"
          text="提交"/>
      </ScrollView>
    );
  }

  _submit() {
    this.setState({ submitting: true })

    return post('/loanctcf/create-contract').then(response => {
      // TODO remove
      response.res = responseStatus.success

      if(response.res == responseStatus.failure) {
        throw response.msg
      }
      return true;
    }).catch(err => {
      this.setState({ submitting: false, error: err });
      throw err;
    })
  }
}

const styles = StyleSheet.create({
  error: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: fontSize.normal,
    color: colors.error
  },
  agreement: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxTxt: {
    color: colors.grayLight,
    fontSize: fontSize.small,
  },
  textRow: {
    padding: 10,
  },
  amount: {
    height: 80,
    paddingBottom: 30,
  },
  amountTip: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    color: colors.grayLight,
    fontSize: fontSize.normal
  },
});


import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return {
    userInfo: state.online.userInfo.data,
    ...state.online.applyResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(actions.applyResult())
      dispatch(actions.userInfo())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(LoanSign)));
