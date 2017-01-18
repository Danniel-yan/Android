import React, { Component } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import { ExternalPushLink } from 'containers/shared/Link';
import CreditLimitPanel from './creditLoan/CreditLimitPanel';
import CreditBroadcast from 'containers/scene/creditLoan/CreditBroadcast';
import Banner from 'containers/scene/home/Banner';




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
        <View style={[_styles.itemBg, _styles.splitTop,{height:56}]}>
          <CreditBroadcast />
        </View>
        <View style={[_styles.itemBg, _styles.splitTop]}>
          <View style={{flexDirection: "row"}}>
            <View style={[{flex: 1}, _styles.bdRight]}>
            {
              this._renderItem(require("assets/credit-icons/shenfenrenzhengdai.png"), "身份认证贷", {toKey : "LoanScene",title:'极速贷款',componentProps :{onBack: true, selectIndex : null  }})
            }
            {
              this._renderItem(require("assets/credit-icons/gongjijindai.png"), "公积金贷", {toKey : "LoanScene",title:'极速贷款',componentProps :{onBack: true, selectIndex : null}})
            }
            {
              this._renderItem(require("assets/credit-icons/shoujirenzhengdai.png"), "手机认证贷", {toKey : "LoanScene",title:'极速贷款',componentProps :{onBack: true, selectIndex : 0}})
            }
            </View>
            <View style={{flex: 1}}>
            {
              this._renderItem(require("assets/credit-icons/xinyongkadai.png"), "信用卡贷", {toKey : "LoanScene",title:'极速贷款',componentProps :{onBack: true, selectIndex : 4}})
            }
            {
              this._renderItem(require("assets/credit-icons/dianshangdai.png"), "电商贷", {toKey : "LoanScene",title:'极速贷款',componentProps :{onBack: true,selectIndex : 3}})
            }
            {
              this._renderItem(require("assets/credit-icons/zhimaxinyongdai.png"), "芝麻信用贷", {toKey : "LoanScene",title:'极速贷款',componentProps :{onBack: true,selectIndex : null}},)
            }
            </View>
          </View>
        </View>
        <View style = {{flex:1}}>
            <Banner />
        </View>
      </View>

    );
  }

  _renderItem(icon, title, navProps,componentProps) {
    return (
      <ExternalPushLink {...navProps} {...componentProps}>
        <View style={[_styles.item, _styles.bdBottom]}>
          <Image style={_styles.icon} source={icon}/>
          <Text style={_styles.txt}>{title}</Text>
        </View>
      </ExternalPushLink>
    );
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
