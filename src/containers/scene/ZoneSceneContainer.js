import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';

import fetchUser from 'actions/loginUser';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import Text from 'components/shared/Text';
import Button from 'components/shared/Button';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import SceneHeader from 'components/shared/SceneHeader';
import zoneStyles from './zone/zoneStyles';
import * as defaultStyles from 'styles';
import { colors } from 'styles/varibles';

import Login from 'containers/Login';
import AbstractScene from 'components/scene/AbstractScene.js';

class ZoneScene extends AbstractScene {

  constructor(props) {
    super(props);

    this.state = {
      checking: true,
      hasToken: false
    };
    this.sceneKey = "my_account";
    this.sceneTopic = "my_account";
    this.sceneEntity = "my_account";
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
        <ScrollView style={zoneStyles.container}>

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

          <ExternalPushLink
            tracking={{key: 'my_account', topic: 'btn_sec', entity: 'icon_contact'}}
            toKey="ContactScene" title="联系我们">

            <View style={zoneStyles.item}>
              <Image style={zoneStyles.icon} source={require('assets/zone/contact.png')}/>
              <Text style={zoneStyles.txt}>联系我们</Text>
              <NextIcon/>
            </View>
          </ExternalPushLink>

          <ExternalPushLink
            tracking={{key: 'my_account', topic: 'btn_sec', entity: 'icon_set'}}
            toKey="SettingScene" title="设置">

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
          <View style={[zoneStyles.item, zoneStyles.loginWrap]}>
            <Image style={zoneStyles.icon} source={require('assets/zone/user-blank.png')}/>
            <Text style={zoneStyles.txt}>{loginUser.info.username}</Text>
            <NextIcon/>
          </View>
        </ExternalPushLink>
      );
    }

    if(this.state.checking || loginUser.isFetching) {
      return (
        <View style={[zoneStyles.item, zoneStyles.loginWrap, defaultStyles.centering]}>
          <Loading/>
        </View>
      );
    }

    if(!this.state.hasToken) {
      return (
        <View style={[zoneStyles.loginWrap, defaultStyles.centering]}>
          <ExternalPushLink
            tracking={{key:'my_account', entity: 'reg_login', topic: 'btn_sec'}}
            style={[zoneStyles.loginBtn, defaultStyles.centering]}
            textStyle={zoneStyles.loginBtnText}
            text="登录注册"
            title="登录"
            toKey="Login"/>
        </View>
      );
    }
  }
}

function mapStateToProps(state) {
  return { loginUser: state.loginUser }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoneScene)
