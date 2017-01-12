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
      this.navToPBOC(token);
    });
  }

  navToPBOC(token) {
    var externalPush = this.props.externalPush, route;
    AsyncStorage.getItem('environment').then(ev => {
      var pbocUrl = 'https://sysapp.jujinpan.cn/static/pages/pboc/index.html?app=chaoshi';
      pbocUrl = ev=="production" ? pbocUrl + "&debug=0" : pbocUrl + "&debug=1";
      // console.log(pbocUrl + "&token=" + token)
      // console.log(fromLogin);
      // externalPush && externalPush({web: pbocUrl + "&token=" + token, backRoute: { key: 'MajorNavigation' }});
      AsyncStorage.setItem("loan_type", "0").then(() => {
        externalPush && externalPush({ key: "CreditLoan", title: "信用贷" })
      })

    })
  }

  render() {
    return !this.props.iosFetched ? null : (
      <View style={[LNPStyles.container]}>
        <View style={{flex:1,flexDirection:"row", alignItems:"center"}}>
          <ExternalPushLink
            tracking={{key: 'homepage', topic: 'btn_sec', entity: (this.props.loginUser.info ? 'recommend_apply' : 'recommend') }}
            title="推荐贷款"
            toKey="RecLoanScene"
            style={LNPStyles.navItem}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text style={LNPStyles.navTxt}>推荐贷款</Text>
          </ExternalPushLink>
          <MajorTabLink
            tracking={{key: 'homepage', topic: 'btn_sec', entity: 'fastloan' }}
            title="极速贷款"
            toKey="LoanScene"
            style={LNPStyles.navItem}>

            <Image source={require('assets/icons/jisudaikuan.png')}></Image>
            <Text style={LNPStyles.navTxt}>极速贷款</Text>
          </MajorTabLink>
          <TrackingPoint
            tracking={{ key: 'homepage', topic: 'btn_sec', entity: 'credit_report'}}
            style={[LNPStyles.navItem]} onPress={this.onPressIconBtn.bind(this)}>
            <Image source={require('assets/icons/chaxinyong.png')}></Image>
            <Text style={LNPStyles.navTxt}>查信用</Text>
          </TrackingPoint>
        </View>
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
  navItem: {flex:1, flexDirection:'column', justifyContent:'center', alignItems: 'center'},
  navTxt: { fontSize: fontSize.normal, color: "#333", marginTop:4 }
});

module.exports = LoanNavPanel;
