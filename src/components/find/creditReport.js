import React, { Component } from 'react';
import { View ,StyleSheet,Text} from 'react-native';
import zoneStyles from 'containers/scene/zone/zoneStyles';
import NextIcon from 'components/shared/NextIcon';

export default class creditReport extends Component {
  render(){
    return (
      <View style = {{flex : 1}}>
        <Text style = {{marginVertical : 20, paddingLeft : 20, fontSize : 16}}>主要报告</Text>
        <View style = {{backgroundColor : '#fff'}}>
          {this._renderNavItem( '多机构申请风险等级', '中级')}
          {this._renderNavItem( '是否命中网贷黑名单', '未命中')}
        </View>
      </View>
    )
  }

  _renderNavItem(txt, status) {
    return (
        <View style={zoneStyles.item}>
          <Text style={[zoneStyles.txt,{fontSize : 14}]}>{txt}</Text>
          <View style = {{flexDirection : 'row'}}>
            <Text style = {{color : 'orange'}}>{status}</Text>
            <NextIcon/>
          </View>
        </View>
    )
  }


}

