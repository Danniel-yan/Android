import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { border, container, colors, fontSize } from 'styles';
import { ExternalPushLink } from 'containers/shared/Link';
import GroupTitle from 'components/GroupTitle';
import BankListContainer from 'containers/scene/card/BankListContainer';
import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import LoanDetailPanel from './LoanDetailPanel';
import ExpireGroup from './ExpireGroup';
import SubmitButton from './SubmitButton';
import Banner from './Banner';


function ApproveStatus(props) {

  //6=提交贷款申请中，7=提交失败，8=提交成功，9=贷款申请失败，10=贷款申请成功
  if(props.status == 10 && props.time_expire_status == 1) {
    return (<ApproveExpire {...props}/>);
  } else if(props.status == 10) {
    return (<ApproveSuccess {...props}/>);
  } else if(props.status == 9 || props.status == 7) {
    return (<ApproveFailure {...props}/>);
  } else {
    return (<Approving {...props}/>);
  }
}



function Approving(props) {
  return (
    <ScrollView>
      <Banner
        icon={require('assets/online/approving.png')}
        text="您的借款申请正在审批"
        footer={"1.我们将尽快联系您确认申请信息，请您保持手机畅通\n2.审批结果将以短信通知您，请您近期留意查收"}
      />

      <GroupTitle offset={false} textStyle={styles.groupTitleText} style={styles.groupTitle} title="亲，等待审批的同时，办办信用卡"/>
      <BankListContainer/>
    </ScrollView>
  );
}

function ApproveFailure(props) {

  return (
    <ScrollView>
      <Banner
        icon={require('assets/online/approve-failure.png')}
        text="很遗憾－申请未能通过"
      />

      <GroupTitle offset={false} textStyle={styles.groupTitleText} style={styles.groupTitle} title="您可以选择其他贷款"/>
      <RecommendListPanel/>

    </ScrollView>
  );

}


function ApproveSuccess(props) {

  let data = props.resultdata;
  console.log(data)

  return (
    <ScrollView>
      <Banner
        icon={require('assets/online/approve-success.png')}
        text="您的借款申请已经通过"
      />

      <GroupTitle offset={false} textStyle={styles.groupTitleText} style={styles.groupTitle} title="审批详情"/>
      <LoanDetailPanel {...data}/>
      <ExpireGroup style={styles.time} date={props.time_expire}/>

      <SubmitButton
        title="签约"
        offset={true}
        toKey="OnlineLoanSign"
        text="确认借款"/>
    </ScrollView>
  );

}


function ApproveExpire(props) {

  let data = {
    sug_loan_amount: 15000,
    sug_term: 24,
    interest_down: 1.2,
    interest_up: 1.7,
    tiem_expire: '2016-12-31 00:00:00'
  }

  return (
    <ScrollView>
      <Banner
        icon={require('assets/online/info.png')}
        text={"抱歉，您的借款已过期。\n如需要，请重新申请。"}
      />

      <GroupTitle offset={false} textStyle={styles.groupTitleText} style={styles.groupTitle} title="审批详情"/>
      <LoanDetailPanel {...data}/>

      <SubmitButton
        title="信息认证"
        offset={true}
        toKey="CertificationHome"
        text="重新申请"/>
    </ScrollView>
  );

}



const styles = StyleSheet.create({
  groupTitle: {
    height: 26,
    backgroundColor: colors.bg
  },
  groupTitleText: {
    fontSize: fontSize.normal
  },
  time: {
    marginTop: 25
  }
});



import { connect } from 'react-redux';
import { trackingScene } from 'high-order/trackingPointGenerator';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import actions from 'actions/online';

function mapStateToProps(state) {
  return Object.assign({}, {
    ...state.online.applyResult,
    ...state.online.status,
  }, {
    // isFetching: state.online.applyResult.isFetching,
    // fetched: state.online.applyResult.fetched

  })
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(actions.status());
      dispatch(actions.applyResult());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  AsynCpGenerator(Loading, trackingScene(ApproveStatus)));