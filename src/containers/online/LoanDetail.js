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
import { colors } from 'styles';
import { post, responseStatus } from 'utils/fetch';

class LoanDetail extends Component {
  render() {
    let props = this.props;
    const serviceAmount = props.repayPlanResults[0].repayAmount;
    const plans = props.repayPlanResults.slice(1);

    return (
      <ScrollView>
        <L2RItem left="合同金额" right={props.applyAmount}/>
        <L2RItem left="手续费" right={serviceAmount}/>
        <L2RItem left="借款期限" right={props.totalLoanRepaymentTerms+'期'}/>
        <L2RItem left="月服务费率" right={props.interestRate}/>

        <GroupTitle title="还款计划表"/>
        <RefundPlan plans={plans}/>
      </ScrollView>
    );
  }
}

import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import externalScene from 'high-order/externalScene';
import { ExternalPushLink } from 'containers/shared/Link';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return state.online.loanDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(actions.loanDetail())
    },
  }
}

class RightButton extends Component {
  state = { html: '' }

  componentDidMount() {

    post('/loanctcf/contract-html', { loan_type: this.props.loan_type}).then(response => {
      if(response.res == responseStatus.success) {
        this.setState({
          html: response.data.html
        });
      }
    })

  }

  render() {
    if(!this.state.html) {
      return null;
    }

    return (
      <ExternalPushLink
        style={{marginRight: 10}}
        textStyle={{color: colors.secondary}}
        web={{html: this.state.html}}
        title="借款合同"
        text="合同"/>
    );
  }
}

let SceneComponent = AsynCpGenerator(Loading, trackingScene(LoanDetail));
SceneComponent = externalScene(SceneComponent, RightButton);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;
