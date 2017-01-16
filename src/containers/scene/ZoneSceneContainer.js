import React, { Component } from 'react';
import { NativeModules, View, ScrollView, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import Text from 'components/shared/Text';
import NextIcon from 'components/shared/NextIcon';
import Button from 'components/shared/ButtonBase';
import { ExternalPushLink } from 'containers/shared/Link';
import SceneHeader from 'components/shared/SceneHeader';
import zoneStyles from './zone/zoneStyles';
import * as defaultStyles from 'styles';
import { trackingScene } from 'high-order/trackingPointGenerator';
import TrackingPoint  from 'components/shared/TrackingPoint';
import { externalPush, majorTab } from 'actions/navigation';
import onlineActions from 'actions/online';


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


           {this._reportInfo()}

           {
             this._renderNavItem(require('assets/zone/contact.png'), "联系我们", {
               tracking: {key: 'my_account', topic: 'btn_sec', entity: 'icon_contact'},
               toKey: "ContactScene", title:"联系我们"
             })
           }
           {
             this._renderNavItem(require('assets/zone/setting.png'), "设置", {
               tracking: {key: 'my_account', topic: 'btn_sec', entity: 'icon_set'},
               toKey: "SettingScene", title:"设置"
             })
           }

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

  _navToPBOC() {
    var externalPush = this.props.externalPush, route;
    var environment = "production";
    AsyncStorage.getItem('environment').then(ev=>{
      environment = ev;
      return AsyncStorage.getItem("userToken");
    }).then(token => {
        var pbocUrl = 'https://sysapp.jujinpan.cn/static/pages/pboc/index.html?app=chaoshi';
        pbocUrl = environment=="production" ? pbocUrl + "&debug=0" : pbocUrl + "&debug=1";
        // console.log(pbocUrl + "&token=" + token);
        externalPush && externalPush({web: pbocUrl + "&token=" + token});
    })
  }

  _reportInfo() {
    let loginUser = this.props.loginUser;

    return loginUser.info ? (
      <View>
        {this._renderNavItem(require('assets/zone/wodezhangdan.png'), "我的账单", { toKey: "BillList", title: "我的账单", prePress: ()=>{this.props.setLoanType&&this.props.setLoanType()} })}
        {this._renderNavItem(require('assets/zone/gongjijinbaogao.png'), "公积金报告", {toKey: "FundLogin", title:"公积金查询"})}
        {this._renderNavItem(require('assets/zone/shebaobaogao.png'), "社保报告", {})}
        <TrackingPoint
          tracking={{ key: 'my_account', topic: 'btn_sec', entity: 'credit_report'}}
          title="征信报告"
          onPress={this._navToPBOC.bind(this)}>
          <View style={zoneStyles.item}>
            <Image style={[zoneStyles.icon]} source={require('assets/zone/zhengxinbaogao.png')}/>
            <Text style={zoneStyles.txt}>征信报告</Text>
            <NextIcon/>
          </View>
        </TrackingPoint>
        {this._renderNavItem(require('assets/zone/chaoshixinyongfen.png'), "钞市信用分", {})}
        {this._renderNavItem(require('assets/zone/footprint.png'), "我的贷款足迹", {})}
        {this._renderNavItem(require('assets/zone/process.png'), "办卡进度查询", {})}
      </View>
    ) : null;
  }

  _renderNavItem(icon, txt, navProps) {
    return (
      <ExternalPushLink
        {...navProps}>
        <View style={zoneStyles.item}>
          <Image style={zoneStyles.icon} source={icon}/>
          <Text style={zoneStyles.txt}>{txt}</Text>
          <NextIcon/>
        </View>
      </ExternalPushLink>
    )
  }
}

function mapStateToProps(state) {
  return { loginUser: state.loginUser }
}

function mapDispatchToProps(dispatch) {
  return {
    externalPush: route => dispatch(externalPush(route)),
    majorTab: route => dispatch(majorTab(route)),
    setLoanType: () => dispatch(onlineActions.setLoanType(9999))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trackingScene(ZoneScene))
