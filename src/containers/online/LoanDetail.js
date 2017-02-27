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
import { get,post, responseStatus,exportUrl } from 'utils/fetch';

class LoanDetail extends Component {
  render() {
    let props = this.props;
    const serviceAmount = props.repayPlanResults[0].repayAmount;
    const plans = props.repayPlanResults.slice(1);

    return (
      <ScrollView>
        <L2RItem left="合同金额" right={props.contractAmount + '元'}/>
        <L2RItem left="手续费" right={serviceAmount + '元'}/>
        <L2RItem left="借款期限" right={props.totalLoanRepaymentTerms+'期'}/>
        <L2RItem left="月费率" right={(props.monthFee || props.interestRate) + "%"}/>

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
      var url=exportUrl('/loanctcf/contract-html');
      url =url+"&loan_type="+this.props.loan_type+"&show_html=1";
      console.log(url);
      this.setState({html : url})
  }

  render() {
    if(!this.state.html) {
      return null;
    }

    return (
      <ExternalPushLink
        style={{marginRight: 10}}
        textStyle={{color: colors.secondary}}
        web={this.state.html}
        title="借款合同"
        text="合同"/>
    );
  }
}

let SceneComponent = AsynCpGenerator(Loading, trackingScene(LoanDetail), true);
SceneComponent = externalScene(SceneComponent, RightButton);
SceneComponent = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
SceneComponent.external = true;
export default SceneComponent;