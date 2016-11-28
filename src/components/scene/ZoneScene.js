import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';

import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import SceneHeader from 'components/shared/SceneHeader';

import zoneStyles from './zone/styles';
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles';

export default class ZoneScene extends Component {
  render() {
    return (
      <View style={defaultStyles.container}>
        <SceneHeader title="我的"/>
        <ScrollView style={styles.container}>

          {this._loginInfo()}

          <View style={zoneStyles.item}>
            <Image style={zoneStyles.icon} source={require('assets/zone/process.png')}/>
            <Text style={zoneStyles.txt}>办卡进度查询</Text>
            <NextIcon/>
          </View>

          <View style={zoneStyles.item}>
            <Image style={zoneStyles.icon} source={require('assets/zone/footprint.png')}/>
            <Text style={zoneStyles.txt}>我的贷款足迹</Text>
            <NextIcon/>
          </View>

          <ExternalPushLink toKey="MessagesScene">
            <View style={zoneStyles.item}>
              <Image style={zoneStyles.icon} source={require('assets/zone/message.png')}/>
              <Text style={zoneStyles.txt}>我的消息</Text>
              <NextIcon/>
            </View>
          </ExternalPushLink>


          <ExternalPushLink toKey="ContactScene">
            <View style={zoneStyles.item}>
              <Image style={zoneStyles.icon} source={require('assets/zone/contact.png')}/>
              <Text style={zoneStyles.txt}>联系我们</Text>
              <NextIcon/>
            </View>
          </ExternalPushLink>

          <ExternalPushLink toKey="SettingScene">
            <View style={zoneStyles.item}>
              <Image style={zoneStyles.icon} source={require('assets/zone/setting.png')}/>
              <Text style={zoneStyles.txt}>设置</Text>
              <NextIcon/>
            </View>
          </ExternalPushLink>
        </ScrollView>
      </View>
    );
  }

  _loginInfo() {
    return (
      <View style={[zoneStyles.item, styles.loginWrap]}>
        <Image style={zoneStyles.icon} source={require('assets/zone/user-blank.png')}/>
        <Text style={zoneStyles.txt}>18964165910</Text>
        <NextIcon/>
      </View>
    );

    return (
      <View style={[styles.loginWrap, defaultStyles.centering]}>
        <Button style={styles.loginBtn} text="登录注册"/>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  loginWrap: {
    height: 93,
    backgroundColor: '#fff',
    marginBottom: 5
  },
  loginBtn: {
    width: 90,
    height: 33,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    color: colors.secondary,
    fontSize: 17
  }
});
