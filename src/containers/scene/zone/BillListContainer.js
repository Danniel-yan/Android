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

class BillList extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (<View><Text>我的账单</Text></View>);
  }
}

function mapStateToProps(state) {
  // TODO 这个billList是不是应该不是这么取的
  return { billList: state.online.bankResult.billList || [] }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(onlineActions.bankResult())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, BillList));
