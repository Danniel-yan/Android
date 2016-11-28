import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  AsyncStorage,
  ActivityIndicator,
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

import Login from 'containers/Login';

export default class ZoneScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginModal: false,
      checkedUser: false
    };
  }

  componentDidMount() {
    if(!this.props.user) {
      AsyncStorage.getItem('userToken').then(token => {
        if(token) {
          this.props.fetching();
        } else {
          this.setState({ checkedUser: true });
        }
      })
    }
  }

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

          <ExternalPushLink prePress={this._checkLogin.bind(this)} toKey="MessagesScene">
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

        <Modal
          animationType="slide"
          visible={this.state.loginModal}
          onRequestClose={this._closeLoginModal.bind(this)}
          >
          <View style={defaultStyles.container}>
            <SceneHeader title="登录" onBack={this._closeLoginModal.bind(this)}/>
            <Login loginSuccess={this.props.fetching}/>
          </View>
        </Modal>
      </View>
    );
  }

  _closeLoginModal() {
    this.setState({ loginModal: false });
  }

  _checkLogin() {
    return new Promise((resolve, reject) => {
      if(this.props.userInfo) { return resolve(true); }

      this.setState({ loginModal: true });
    });
  }

  _loginInfo() {
    if(this.props.user) {
      return (
        <View style={[zoneStyles.item, styles.loginWrap]}>
          <Image style={zoneStyles.icon} source={require('assets/zone/user-blank.png')}/>
          <Text style={zoneStyles.txt}>{this.props.user.username}</Text>
          <NextIcon/>
        </View>
      );
    }

    if(this.state.checkedUser) {
      return (
        <View style={[styles.loginWrap, defaultStyles.centering]}>
          <Button style={styles.loginBtn} text="登录注册"/>
        </View>
      );
    }

    return (
      <View style={[zoneStyles.item, styles.loginWrap, defaultStyles.centering]}>
        <ActivityIndicator/>
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
