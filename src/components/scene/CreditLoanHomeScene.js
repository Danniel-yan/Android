import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import CreditLimitPanel from './creditLoan/CreditLimitPanel';
import CreditBroadcast from 'containers/scene/creditLoan/CreditBroadcast';

console.log(CreditBroadcast);

export default class CreditLoanHomeScene extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={[_styles.itemBg]}>
          <CreditLimitPanel />
        </View>
        <View style={[_styles.itemBg, _styles.splitTop]}>
          <CreditBroadcast />
        </View>
        <View style={[_styles.itemBg, _styles.splitTop]}>
          <View style={{flexDirection: "row"}}>
            <View style={[{flex: 1}, _styles.bdRight]}>
            {
              this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {})
            }
            {
              this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {})
            }
            {
              this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {})
            }
            </View>
            <View style={{flex: 1}}>
            {
              this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {})
            }
            {
              this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {})
            }
            {
              this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {})
            }
            </View>
          </View>
        </View>
      </View>
    );
  }

  _renderItem(icon, title, navProps) {
    return (
      <ExternalPushLink {...navProps}>
        <View style={[_styles.item, _styles.bdBottom]}>
          <Image style={_styles.icon} source={icon}/>
          <Text style={_styles.txt}>{title}</Text>
        </View>
      </ExternalPushLink>
    );
  }
}
//{this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {})}

const _styles = {
  itemBg: { backgroundColor: "white" },
  splitTop: { marginTop: 5 },
  bdRight: { borderRightWidth: 1, borderRightColor: "#E6E6E6" },
  bdBottom: { borderBottomWidth: 1, borderBottomColor: "#E6E6E6" },
  item: { flexDirection: "row", alignItems: "center", height: 70, borderBottomWidth: 1, borderBottomColor: "#E6E6E6" },
  icon: { width:40, height:40, marginHorizontal: 10 },
  txt: { fontSize: 14, paddingHorizontal: 4 }
}
