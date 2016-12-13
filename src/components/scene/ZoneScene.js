import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Image
} from 'react-native';

import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import SceneHeader from 'components/shared/SceneHeader';
import Loading from 'components/shared/Loading';
import zoneStyles from './zone/styles';
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles';

import Login from 'containers/Login';
import AbstractScene from 'components/scene/AbstractScene.js';

export default class ZoneScene extends AbstractScene {

  constructor(props) {
    super(props);

    this.state = {
      checking: true,
      hasToken: false
    };
    this.sceneKey = "user";
    this.sceneTopic = "zone";
    this.sceneEntity = "";
  }

  componentDidMount() {
    if(!this.props.loginUser.info) {
      AsyncStorage.getItem('userToken').then(userToken => {
        if(userToken != null) {
          this.props.fetching();
          this.setState({ hasToken: true, checking: false });
        } else {
          this.setState({ hasToken: false, checking: false });
        }
      })
    }
  }

  componentDidUpdate() {
    AsyncStorage.getItem('userToken').then(userToken => {
      if(this.state.hasToken != !!userToken) {
        this.setState({ hasToken: !!userToken });
      }
    })
  }

  render() {
    let logined = this.state.hasToken || this.props.loginUser.info;

    return (
      <View style={[defaultStyles.container, defaultStyles.bg]}>
        <SceneHeader title="我的"/>
        <ScrollView style={styles.container}>

          {this._loginInfo()}

          {/*
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

          <ExternalPushLink title={logined ?  '消息' : '登录'} toKey={logined ? 'MessagesScene' : 'Login'}>
            <View style={zoneStyles.item}>
              <Image style={zoneStyles.icon} source={require('assets/zone/message.png')}/>
              <Text style={zoneStyles.txt}>我的消息</Text>
              <NextIcon/>
            </View>
          </ExternalPushLink>
          */}

          <ExternalPushLink toKey="ContactScene" title="联系我们">
            <View style={zoneStyles.item}>
              <Image style={zoneStyles.icon} source={require('assets/zone/contact.png')}/>
              <Text style={zoneStyles.txt}>联系我们</Text>
              <NextIcon/>
            </View>
          </ExternalPushLink>

          <ExternalPushLink toKey="SettingScene" title="设置">
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
    let loginUser = this.props.loginUser;

    if(!loginUser.fetching && loginUser.info) {
      return (
        <ExternalPushLink title="个人信息" toKey="UserInfo">
          <View style={[zoneStyles.item, styles.loginWrap]}>
            <Image style={zoneStyles.icon} source={require('assets/zone/user-blank.png')}/>
            <Text style={zoneStyles.txt}>{loginUser.info.username}</Text>
            <NextIcon/>
          </View>
        </ExternalPushLink>
      );
    }

    if(this.state.checking || loginUser.isFetching) {
      return (
        <View style={[zoneStyles.item, styles.loginWrap, defaultStyles.centering]}>
          <Loading/>
        </View>
      );
    }

    if(!this.state.hasToken) {
      return (
        <View style={[styles.loginWrap, defaultStyles.centering]}>
          <ExternalPushLink
            tracking={{key:'Login', entiry: 'login', topic: 'btn_sec', event: 'click'}}
            style={[styles.loginBtn, defaultStyles.centering]}
            textStyle={styles.loginBtnText}
            text="登录注册"
            title="登录"
            toKey="Login"/>
        </View>
      );
    }
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
  },
  loginBtnText: {
    color: colors.secondary,
    fontSize: 17
  }
});
