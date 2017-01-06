import React, { Component } from 'react';
import { NativeModules, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import Text from 'components/shared/Text';
import NextIcon from 'components/shared/NextIcon';
import Button from 'components/shared/ButtonBase';
import { ExternalPushLink } from 'containers/shared/Link';
import SceneHeader from 'components/shared/SceneHeader';
import zoneStyles from './zone/zoneStyles';
import * as defaultStyles from 'styles';
import { trackingScene } from 'high-order/trackingPointGenerator';


class ZoneScene extends Component {

  tracking = 'my_account';

  render() {
    let logined = this.props.loginUser.info;

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

          <Button onPress={this._service.bind(this)}>
            <View style={zoneStyles.item}>
            <Image style={zoneStyles.icon} source={require('assets/zone/service.png')}/>
            <Text style={zoneStyles.txt}>用户反馈</Text>
            <NextIcon/>
            </View>
          </Button>
        </ScrollView>

      </View>
    );
  }

  _service() {
    NativeModules.FeedbackModule.openFeedback();
  }

  _loginInfo() {
    let loginUser = this.props.loginUser;

    if(loginUser.info) {
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

function mapStateToProps(state) {
  return { loginUser: state.loginUser }
}

export default connect(mapStateToProps)(trackingScene(ZoneScene))
