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
import { colors, iptFontSize } from "styles/varibles";
import { MajorTabLink, ExternalPushLink } from 'containers/shared/Link';

class LoanNavPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' }
  }

  onPressNumberBtn() {
    tracker.trackAction('homepage', 'iwantmoney', 'btn_sec', 'click');
    var amount = parseInt(this.state.text) || null;
    amount && this.props.setAmount && this.props.setAmount(amount);
    this.props.majorTab && this.props.majorTab("LoanScene");
  }

  onPressIconBtn() {
    AsyncStorage.getItem('userToken').then(token => {
      var externalPush = this.props.externalPush, route;
      if(!token) {
        route = { key: "Login", componentProps: { customLoginSuccess: () => (this.onPressIconBtn()) } };
        externalPush && externalPush(route);
        return;
      }
      AsyncStorage.getItem('environment').then(ev => {
        var pbocUrl = 'https://sysapp.jujinpan.cn/static/pages/pboc/index.html?app=chaoshi';
        pbocUrl = ev=="production" ? pbocUrl + "&debug=0" : pbocUrl + "&debug=1";
        tracker.trackAction('homepage', 'credit', 'btn_sec', 'click');
        // console.log(pbocUrl + "&token=" + token)
        externalPush && externalPush({web: pbocUrl + "&token=" + token});
      })
    });
  }

  render() {
    return (
      <View style={[LNPStyles.container]}>
        <View style={{height:25,flexDirection:"row"}}>
          <View style={LNPStyles.iptWrap} >
          <Input type={"number"} style={LNPStyles.input} placeholder="请输入想借的金额" onChangeText={(text)=> {
            this.setState({text: text.replace(/[^\d]/g,'')})
          }} defaultValue={this.state.text}></Input></View>
          <View style={[LNPStyles.btnWrap]}>
            <TouchableOpacity onPress={this.onPressNumberBtn.bind(this)}><Text style={[LNPStyles.btn]}>我要借钱</Text></TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1,flexDirection:"row", alignItems:"center", paddingTop: 12}}>
          <ExternalPushLink
            tracking={{key: 'homepage', topic: 'btn_sec', entity: 'recommend', event: 'click'}}
            title="推荐贷款"
            toKey="RecLoanScene"
            style={LNPStyles.navItem}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text style={LNPStyles.navTxt}>推荐贷款</Text>
          </ExternalPushLink>
          <MajorTabLink
            tracking={{key: 'homepage', topic: 'btn_sec', entity: 'fastloan', event: 'click'}}
            title="极速贷款"
            toKey="LoanScene"
            style={LNPStyles.navItem}>

            <Image source={require('assets/icons/jisudaikuan.png')}></Image>
            <Text style={LNPStyles.navTxt}>极速贷款</Text>
          </MajorTabLink>
          <TouchableOpacity style={[LNPStyles.navItem]} onPress={this.onPressIconBtn.bind(this, 2)}>
            <Image source={require('assets/icons/chaxinyong.png')}></Image>
            <Text style={LNPStyles.navTxt}>查信用</Text>
          </TouchableOpacity>
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
    padding: 8, paddingLeft: 10, paddingRight: 10,
    height: 136,
    backgroundColor: "#FFF"
  },
  iptWrap: {
    backgroundColor: "#F3F3F3",
    height:32,
    flex:3,
    borderTopLeftRadius:14,
    borderBottomLeftRadius: 14
  },
  input: {
    paddingLeft: 12,
    height:32,
    paddingTop:0,paddingBottom:0,
    fontSize: iptFontSize,
    flex: 1
  },
  btnWrap: {
    flex:1,
    height:32,
    paddingRight: 5,
    backgroundColor: colors.secondary,
    borderTopRightRadius:14,
    borderBottomRightRadius: 14,
    justifyContent: "center"
  },
  btn: {
    color: "#fff",
    textAlign: "center",
    fontSize: iptFontSize
  },
  navItem: {flex:1, flexDirection:'column', justifyContent:'center', alignItems: 'center'},
  navTxt: { fontSize:iptFontSize, color: "#333", marginTop:8 }
});

module.exports = LoanNavPanel;
