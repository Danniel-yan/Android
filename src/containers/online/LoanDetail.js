import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage
} from 'react-native';

import RefundPlan from './RefundPlan';
import L2RItem from './L2RItem';
import GroupTitle from 'components/GroupTitle';
import NextIcon from 'components/shared/NextIcon';
import ProcessingButton from 'components/shared/ProcessingButton'
import { colors, border, fontSize } from 'styles';
import { get,post, responseStatus,exportUrl } from 'utils/fetch';
import { loanType } from 'constants';

class LoanDetail extends Component {
  constructor() {
    super();
    this.state = {
      submitting: false
    }
  }

  render() {
    // let bankInfo = this.props.bankInfo;
    let repayAmount = this.props.repayAmount;
    let loanDetail = this.props.loanDetail;
    const serviceAmount = loanDetail.repayPlanResults[0].repayAmount;
    const plans = loanDetail.repayPlanResults.slice(1);
    let url=exportUrl('/loanctcf/contract-html');
    url =url+"&loan_type="+this.props.loan_type+"&show_html=1";

    return (
      <ScrollView>
        <L2RItem left="合同金额" right={loanDetail.contractAmount + '元'}/>
        <L2RItem left="手续费" right={serviceAmount + '元'}/>
        <L2RItem left="借款期限" right={loanDetail.totalLoanRepaymentTerms+'期'}/>
        <L2RItem left="月费率" right={(loanDetail.monthFee || loanDetail.interestRate) + "%"}/>
        {
          this._renderWebItem("合同", url)
        }
        {
          this._renderViewType(plans, repayAmount)
        }

      </ScrollView>
    );
  }

  _submit() {
    if(this.submitting) { return; }

    let loan_type = this.props.loan_type;
    this.submitting = true;
    this.setState({
        submitting: true
    })
    post('/payctcfloan/pay-result', {loan_type})
        .then(res => {
          this.submitting = false;
          this.setState({submitting: false})
          if (res.res == responseStatus.failure || (res.data.status != 3 && res.data.status != 6)) {
              this.props.externalPush({key : 'RepaymentScene',title:'借款详情'})
          } else {
              AsyncStorage.setItem('ticket_id', res.data.ticket_id)
              this.props.externalPush({key : 'RepaymentResult',title:'还款结果'})
          }
        })
        .catch(err => { console.log(err); })
        .finally(() => {
          this.submitting = false;
          this.setState({submitting: false})
        })
  }

  _renderViewType(plans, repayAmount) {
    if (this.props.loan_type == loanType.huankuan) {
      // let bankname = bankInfo.bank_name + "(****" + bankInfo.bank_card_no.slice(-4) + ")";
      let dis = repayAmount.status == 1 || repayAmount.amount <= 0;
      return(
        <View>
          {
            this._renderNavItem("还款计划表",{
              toKey: "OnlineTrialRepaymentPlan",
              title: "还款计划"
            })
          }
        </View>
          // <L2RItem left="当前待还" right={ repayAmount.status == 0 ? repayAmount.amount + '元' : '计算中...'}/>
          // <L2RItem left="还款银行卡" right={bankname}/>
          //
          // <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
          //   <ProcessingButton
          //     processing={this.state.submitting}
          //     onPress={this._submit.bind(this)}
          //     style={dis ? styles.submitBtn_dis : styles.submitBtn}
          //     textStyle={styles.submitBtnText}
          //     disabled={dis}
          //     text="一键还款"/>
          // </View>
      )
    }else{
      return(
        <View>
          <GroupTitle title="还款计划表"/>
          <RefundPlan plans={plans}/>
        </View>
      )
    }
  }

  _renderWebItem(txt, url) {
    return (
      <ExternalPushLink
        web={url}
        title="借款合同">
        <View style={styles.item}>
          <Text style={styles.text}>{txt}</Text>
          <NextIcon/>
        </View>
      </ExternalPushLink>
    )
  }

  _renderNavItem(txt, navProps) {
    return (
      <ExternalPushLink
        {...navProps}>
        <View style={styles.item}>
          <Text style={styles.text}>{txt}</Text>
          <NextIcon/>
        </View>
      </ExternalPushLink>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 44,
    backgroundColor: '#fff',
    ...border('bottom')
  },
  text: {
    flex: 1,
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  submitBtn: {
    flex: 1,
    marginTop: 50,
    height: 40,
    backgroundColor: '#FF003C',
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10
  },
  submitBtn_dis: {
    flex: 1,
    marginTop: 50,
    height: 40,
    backgroundColor: '#c8c8c8',
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10
  },
  submitBtnText: {
    fontSize: 20,
    color: '#fff',
  }
});

import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import externalScene from 'high-order/externalScene';
import { ExternalPushLink } from 'containers/shared/Link';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';
import { externalPush } from 'actions/navigation';

function mapStateToProps(state) {
  let fetching = state.online.loanDetail.isFetching;
  if (state.online.loanType.type == loanType.huankuan) {
    fetching = fetching || state.online.repayAmount.isFetching;
  }
  return {
    isFetching: fetching,
    loanDetail: state.online.loanDetail,
    // bankInfo: state.online.bankInfo,
    repayAmount: state.online.repayAmount
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(actions.loanDetail())
    },
   externalPush : route => dispatch(externalPush(route))
  }
}

let SceneComponent = AsynCpGenerator(Loading, trackingScene(LoanDetail), true);
SceneComponent = externalScene(SceneComponent);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;
