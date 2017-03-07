// 首页贷款导向组件

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View, Image, Text, TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Input from 'components/shared/Input';

import tracker from 'utils/tracker.js';
import { fontSize, colors } from "styles/varibles";
import { MajorTabLink, ExternalPushLink } from 'containers/shared/Link';
import Button from 'components/shared/ButtonBase';
import TrackingPoint  from 'components/shared/TrackingPoint';

class LoanNavPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' }
  }

  onPressNumberBtn() {
    var amount = parseInt(this.state.text) || null;
    amount && this.props.setAmount && this.props.setAmount(amount);
    this.props.majorTab && this.props.majorTab("LoanScene");
  }

  onPressIconBtn() {
    AsyncStorage.getItem('userToken').then(token => {
      var externalPush = this.props.externalPush, route;
      if(!token) {
        route = { key: "Login", componentProps: { loginSuccess: () => (this.onPressIconBtn()) } };
        externalPush && externalPush(route);
        return;
      }
      this.navToCreditLoan(token);
    });
  }

  navToCreditLoan(token) {
    var externalPush = this.props.externalPush, route;
    AsyncStorage.getItem('environment').then(ev => {
      externalPush && externalPush({ key: "CreditLoan", title:this.props.isIOS ? '查信用' : "信用贷", backRoute: { key: "MajorNavigation" } });
      this.props.setLoanType && this.props.setLoanType(0);
      this.props.pbocInitial && this.props.pbocInitial();
    })
  }

  render() {
    // <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/mid_icon_1.gif', width : 50, height: 50}}></Image>
    // <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
    return !this.props.iosFetched ? null : (
      <View style={this.props.isIOS ? LNPStyles.iosContainer : LNPStyles.container}>
        {this.props.isIOS ?
          (<View style={{flex:1,flexDirection:"row", alignItems:"center"}}>
            <TrackingPoint
                tracking={{ key: 'homepage', topic: 'btn_sec', entity: 'credit_loan'}}
                style={[LNPStyles.navItem]} onPress={this.onPressIconBtn.bind(this)}
                title="查信用">
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/xinyongdai.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>查信用</Text>
            </TrackingPoint>
            <MajorTabLink
                tracking={{key: 'homepage', topic: 'btn_sec', entity: 'fastloan' }}
                title="推荐"
                toKey="LoanScene"
                style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/jisudaikuan.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>推荐</Text>
            </MajorTabLink>
            <ExternalPushLink
                tracking={{key: 'homepage', topic: 'btn_sec', entity: 'recommend_all' }}
                title="看评级"
                toKey="RecLoanScene"
                style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/kanpingji.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>看评级</Text>
            </ExternalPushLink>
            <ExternalPushLink
                tracking={{key: 'homepage', topic: 'btn_sec', entity: 'recommend_all' }}
                title="送红包"
                toKey="RecLoanScene"
                style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/songhongbao.gif', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>送红包</Text>
            </ExternalPushLink>
          </View>
          ) :
          (<View style={{flex:1,flexDirection:"row", alignItems:"center"}}>
            <ExternalPushLink
              tracking={{key: 'homepage', topic: 'btn_sec', entity: 'recommend_all' }}
              title="贷款推荐"
              toKey="RecLoanScene"
              style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/tuijiandaikuan.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>贷款推荐</Text>
            </ExternalPushLink>
            <MajorTabLink
              tracking={{key: 'homepage', topic: 'btn_sec', entity: 'fastloan' }}
              title="极速贷款"
              toKey="LoanScene"
              style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/jisudaikuan.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>极速贷款</Text>
            </MajorTabLink>
            <TrackingPoint
              tracking={{ key: 'homepage', topic: 'btn_sec', entity: 'credit_loan'}}
              style={[LNPStyles.navItem]} onPress={this.onPressIconBtn.bind(this)}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/xinyongdai.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>信用贷</Text>
            </TrackingPoint>
            <ExternalPushLink
              tracking={{key: 'homepage', topic: 'btn_sec', entity: 'low_interest_loan' }}
              title="低息贷"
              toKey="LoanScene"
              componentProps = {{onBack : true}}
              style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/dixidai.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>低息贷</Text>
            </ExternalPushLink>
          </View>)}
        </View>
    );
  }

  propTypes: {
    pressNumberBtn: propTypes.func.isRequired, // 点击input右边Button
    pressIconBtn: propTypes.func.isRequired, // 点击Icon, 传参Number-> 0: "推荐贷款", 1: "极速贷款", 2:"查信用"
  }
}

const LNPStyles = StyleSheet.create({
  container: {
    paddingLeft: 10, paddingRight: 10,
    height: 86,
    backgroundColor: "#FFF"
  },
    iosContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 130,
        backgroundColor: "#FFF"
    },
  navItem: {flex:1, flexDirection:'column', justifyContent:'center', alignItems: 'center'},
  navTxt: { fontSize: fontSize.normal, color: "#333", marginTop:4 }
});

module.exports = LoanNavPanel;
