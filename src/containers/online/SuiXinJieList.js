import React, { Component } from "react";
import { View, Text, Image } from 'react-native';
import RecommendList from 'components/shared/RecommendList';
import { ExternalPushLink } from 'containers/shared/Link';
import { SuiXinJieExternalOnline } from 'components/shared/ExternalOnlineBtn';
import MenuItem from 'components/shared/MenuItem';

class SuiXinJieList extends Component {
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
              prePress={() => this.props.setLoanType(loan.loan_type)}
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
    setLoanType: (type) => { dispatch(onlineAction.setLoanType(type)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, SuiXinJieList));
