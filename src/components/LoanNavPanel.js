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
    tracker.trackGIO('clk_homepage_credit_loan',{})
    this.onPressIcon();
  }

  onPressIcon() {
    AsyncStorage.getItem('userToken').then(token => {
      var externalPush = this.props.externalPush, route;
      if(!token) {
        route = { key: "Login", componentProps: { loginSuccess: () => (this.onPressIcon()) } };
        externalPush && externalPush(route);
        return;
      }
      this.navToCreditLoan(token);
    });
  }

  navToCreditLoan(token) {
    var externalPush = this.props.externalPush, route;
    AsyncStorage.getItem('environment').then(ev => {
      externalPush && externalPush({ key: "CreditLoan", title:this.props.isIOS ? '查信用' : "信用评级", backRoute: { key: "MajorNavigation" } });
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
              <Text style={LNPStyles.navTxt}>{this.props.isIOSVerifying ? "推荐":"贷款"}</Text>
            </MajorTabLink>
            <ExternalPushLink
                tracking={{key: 'homepage', topic: 'btn_sec', entity: 'level' }}
                title="看评级"
                toKey="RecLoanScene"
                style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/kanpingji.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>看评级</Text>
            </ExternalPushLink>
            {this.props.topBanner && this.props.topBanner.pic ? (<ExternalPushLink
                tracking={{key: 'homepage', topic: 'btn_sec', entity: '' }}
                title="送红包"
                web={this.props.topBanner.url}
                style={LNPStyles.navItem}>
              <Image source={{uri : this.props.topBanner.pic, width : 50, height: 50}} style={{borderRadius:25}}></Image>
              <Text style={LNPStyles.navTxt}>送红包</Text>
            </ExternalPushLink>) : null}
          </View>
          ) :
          (<View style={{flex:1,flexDirection:"row", alignItems:"center"}}>
            <ExternalPushLink
              tracking={{key: 'homepage', topic: 'btn_sec', entity: 'recommend_all' }}
              title="贷款推荐"
              toKey="RecLoanScene"
              prePress={() => tracker.trackGIO('clk_homepage_recommend_all',{})}
              style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/tuijiandaikuan_1331.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>贷款推荐</Text>
            </ExternalPushLink>
            <MajorTabLink
              tracking={{key: 'homepage', topic: 'btn_sec', entity: 'fastloan' }}
              title="极速贷款"
              toKey="LoanScene"
              prePress={() => tracker.trackGIO('clk_homepage_fastloan',{})}
              style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/jisudaikuan_1331.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>极速贷款</Text>
            </MajorTabLink>
            <TrackingPoint
              tracking={{ key: 'homepage', topic: 'btn_sec', entity: 'credit_level'}}
              style={[LNPStyles.navItem]} onPress={this.onPressIconBtn.bind(this)}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/xinyongdai_1331.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>信用评级</Text>
            </TrackingPoint>
            <ExternalPushLink
              tracking={{key: 'homepage', topic: 'btn_sec', entity: 'low_interest_loan' }}
              title="低息贷"
              toKey="LoanScene"
              prePress={() => tracker.trackGIO('clk_homepage_low_interest_loan',{})}
              componentProps = {{onBack : true}}
              style={LNPStyles.navItem}>
              <Image source={{uri : 'http://sys-php.img-cn-shanghai.aliyuncs.com/static/images/chaoshi-picon/dixidai_1331.png', width : 50, height: 50}}></Image>
              <Text style={LNPStyles.navTxt}>低息贷</Text>
            </ExternalPushLink>
          </View>)}
        </View>
    );
  }

  propTypes: {
    pressNumberBtn: propTypes.func.isRequired, // 点击input右边Button
    pressIconBtn: propTypes.func.isRequired // 点击Icon, 传参Number-> 0: "推荐贷款", 1: "极速贷款", 2:"查信用"
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
