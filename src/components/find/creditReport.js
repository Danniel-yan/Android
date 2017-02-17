import React, { Component } from 'react';
import { View ,StyleSheet,Text} from 'react-native';
import zoneStyles from 'containers/scene/zone/zoneStyles';
import NextIcon from 'components/shared/NextIcon';

export default class creditReport extends Component {
  render(){
    var props = this.props || {};
    return (
      <View style={{flex : 1}}>
        <Text style={{marginVertical : 15, paddingLeft : 10, fontSize : 14, color : '#FF6D17'}}>主要报告内容</Text>
        <View style={{backgroundColor : '#fff'}}>
          {false ? this._renderNavItem( '多机构申请风险等级', '中级') : null}
          {this._renderNavItem( '是否命中网贷黑名单', props.result == 1 ? '命中' : '未命中')}
        </View>
      </View>
    )
  }

  _renderNavItem(txt, status) {
    return (
        <View style={zoneStyles.item}>
          <Text style={[zoneStyles.txt,{fontSize : 14}]}>{txt}</Text>
          <View style = {{flexDirection : 'row'}}>
            <Text style = {styles.status}>{status}</Text>
          </View>
        </View>
    )
  }


}

const styles = StyleSheet.create({
  status : {
    color : '#FF6D17',
    fontSize : 14,
    marginRight : 5
  }
})
