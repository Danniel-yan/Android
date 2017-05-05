import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import CreditLimitPanel from 'containers/creditLoan/CreditLimitPanel';
import CreditBroadcast from 'containers/scene/creditLoan/CreditBroadcast';
import Banner from 'containers/scene/home/Banner';
import CertifPanel from 'containers/creditLoan/CertifPanel';



export default class CreditLoanHomeScene extends Component {
  tracking = 'credit_loan';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style = {{flex : 1}}>
        <View style={[_styles.itemBg]}>
          <CreditLimitPanel />
        </View>
        <View style={[_styles.itemBg, {marginTop: 8}]}>
          <CertifPanel closeModal={() => {}}/>
        </View>
      </View>

    );
  }

  _renderItem(icon, title, navProps,componentProps, tracking) {
    return (
      <ExternalPushLink {...navProps} {...componentProps}>
        <View style={[_styles.item, _styles.bdBottom]}>
          <Image style={_styles.icon} source={icon}/>
          <Text style={_styles.txt}>{title}</Text>
        </View>
      </ExternalPushLink>
    );
  }

  componentDidMount() {
    this.props.fetching && this.props.fetching();
  }

  componentWillUnmount() {
    this.props.reFetchBLFreeStatus && this.props.reFetchBLFreeStatus();
  }
}


const _styles = {
  itemBg: { backgroundColor: "white"},
  splitTop: { marginTop: 5 },
  bdRight: { borderRightWidth: 1, borderRightColor: "#E6E6E6" },
  bdBottom: { borderBottomWidth: 1, borderBottomColor: "#E6E6E6" },
  item: { flexDirection: "row", alignItems: "center", height: 60, borderBottomWidth: 1, borderBottomColor: "#E6E6E6" },
  icon: { width:34, height:34, marginHorizontal: 10 },
  txt: { fontSize: 14, paddingHorizontal: 4 ,flex : 1,}
}
