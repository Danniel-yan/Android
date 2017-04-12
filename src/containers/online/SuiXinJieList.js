import React, { Component } from "react";
import { View, Text, Image } from 'react-native';
import RecommendList from 'components/shared/RecommendList';
import { ExternalPushLink } from 'containers/shared/Link';
import { SuiXinJieExternalOnline } from 'components/shared/ExternalOnlineBtn';
import MenuItem from 'components/shared/MenuItem';

class SuiXinJieList extends Component {
  tracking = { key: "inhouse_loan", topic: "sui_xin_dai" }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: "column", backgroundColor: "#fff"}}>
      {
        this.props.list && this.props.list.map((loan, idx) => {
          return (
            <SuiXinJieExternalOnline key={idx} {...this.props}
              detail={loan} onlineStatus={loan.status}
              prePress={() => {
                this.props.setLoanDetail(loan);
                this.props.setLoanType(loan.loan_type)
              }}
              tracking={{key: "inhouse_loan", topic: "sui_xin_dai", entity: "loan_list", exten_info: JSON.stringify({ title: loan.title, id: loan.id, pos: idx })}}
              >
            </SuiXinJieExternalOnline>
          );
        })
      }
      </View>
    );
  }


}

import { connect } from 'react-redux';
import Loading from 'components/shared/Loading';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import onlineAction from 'actions/online';
import { trackingScene } from 'high-order/trackingPointGenerator';

function mapStateToProps(state) {
  return {
    loginUser: state.loginUser,
    isFetching: state.online.suixinjie.isFetching,
    list: state.online.suixinjie.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => { dispatch(onlineAction.suixinjie("1000")) },
    setLoanType: (type) => { dispatch(onlineAction.setLoanType(type)) },
    setLoanDetail: loan => { dispatch({type: "receiveLoanDetail", detail: loan}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(SuiXinJieList)));
