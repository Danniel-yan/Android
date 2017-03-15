import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
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
    let bankInfo = this.props.bankInfo;
    let props = this.props.loanDetail;
    console.log("bankinfo");
    console.log(bankInfo);
    const serviceAmount = props.repayPlanResults[0].repayAmount;
    const plans = props.repayPlanResults.slice(1);
    let url=exportUrl('/loanctcf/contract-html');
    url =url+"&loan_type="+props.loan_type+"&show_html=1";

    return (
      <ScrollView>
        <L2RItem left="合同金额" right={props.contractAmount + '元'}/>
        <L2RItem left="手续费" right={serviceAmount + '元'}/>
        <L2RItem left="借款期限" right={props.totalLoanRepaymentTerms+'期'}/>
        <L2RItem left="月费率" right={(props.monthFee || props.interestRate) + "%"}/>
        {
          this._renderWebItem("合同", url)
        }
        {
          this._renderViewType(plans, bankInfo)
        }

      </ScrollView>
    );
  }

  _submit() {
    this.setState({ submitting: true})
    if(this.submitting) { return; }
    this.submitting = true;
  }

  _renderViewType(plans, bankInfo) {
    {
      if (this.props.loan_type == loanType.huankuan) {
        let bankname = bankInfo.bank_name + "(****" + bankInfo.bank_card_no.slice(-4) + ")";
        return(
          <View>
            {
              this._renderNavItem("还款计划表",{
                tracking: {key: 'todo', topic: 'todo', entity: 'todo'},
                toKey: "OnlineTrialRefundPlan",
                title: "还款计划",
                componentProps: {plans: plans}
              })
            }
            <L2RItem left="当前待还" right="todo"/>
            <L2RItem left="还款银行卡" right={bankname}/>

            <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
              <ProcessingButton
                processing={this.state.submitting}
                onPress={this._submit.bind(this)}
                style={styles.submitBtn}
                textStyle={styles.submitBtnText}
                disabled={this.props.applyAmount <= 0}
                text="一键还款"/>
            </View>
          </View>
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

function mapStateToProps(state) {
  return {
    isFetching: state.online.loanDetail.isFetching || state.online.bankInfo.isFetching,
    loanDetail: state.online.loanDetail,
    bankInfo: state.online.bankInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(actions.loanDetail()),
      dispatch(actions.bankInfo())
    },
  }
}

let SceneComponent = AsynCpGenerator(Loading, trackingScene(LoanDetail), true);
SceneComponent = externalScene(SceneComponent);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;
