import React, { Component } from 'react';
import {
  View, Text, Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import onlineActions from 'actions/online';

import { ExternalPushLink } from 'containers/shared/Link';

function BillItem({ billId, bankLogo, bankName, userName, userCardNo }) {
  return (
    <ExternalPushLink style={{flexDirection: "row", alignItems: "center", padding: 10, paddingVertical: 20, backgroundColor: "white", borderRadius: 10, marginBottom: 10}}
      title="信用卡账单"
      toKey="BillDetail"
      componentProps={{ billId, bankLogo, userName, userCardNo, type: "bank_wap" }}
      >
      <Image source={{uri: bankLogo}} style={{width: 40, height: 40, marginRight: 10, borderRadius: 20}}></Image>
      <View style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
        <View><Text style={{fontSize: 20}}>{bankName}</Text></View>
        <View style={{flexDirection: "row", alignItems: "center", marginTop: 10}}><Text>{userName} | 尾号{userCardNo}</Text></View>
      </View>
    </ExternalPushLink>
  );
}

class BillList extends Component{
  constructor(props) {
    super(props);
  }

  generateBillList() {
    var p = this.props, billList = p.billList, banks = p.bankList;

    for(var i in billList) {
      var bankId = billList[i].login_target;
      var bankInfo = banks.find(bank => bank.id == bankId);
      billList[i].name = bankInfo.name;
      billList[i].logo = bankInfo.logo;
    }

    return billList;
  }

  render() {
    var p = this.props;
    if(!(p.billList && p.billList.length > 0 && p.bankList && p.bankList.length > 0))
      return (<View><Text>没有账单</Text></View>);

    var billList = this.generateBillList();
    return (
      <View style={{padding: 10}}>
      {
        billList.map((bill, idx) => {
          return (
            <BillItem key={idx} billId={bill.id} bankName={bill.name} bankLogo={bill.logo.px80} userName={bill.name_on_card} userCardNo={bill.card_no} />
          )
        })
      }
      </View>
    )
  }
}

function mapStateToProps(state) {
  // TODO 这个billList是不是应该不是这么取的
  return {
    isFetching: state.online.bankResult.bankBillFetching && state.online.banks.isFetching,
    bankList: state.online.banks.banks,
    billList: state.online.bankResult.billList || []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => { dispatch(onlineActions.setLoanType(9999)); dispatch( onlineActions.bankBillList()); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, BillList));
