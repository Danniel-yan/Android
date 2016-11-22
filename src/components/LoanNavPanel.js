// 首页贷款导向组件

import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  View, Image, Text, TextInput,
  TouchableOpacity
} from 'react-native';

import Input from 'components/shared/Input';

import { colors } from "styles/varibles";

class LoanNavPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { text: '' }
  }

  onPressNumberBtn() {
    this.props.pressNumberBtn && this.props.pressNumberBtn();
  }

  onPressIconBtn(navNumber) {
    this.props.pressIconBtn && this.props.pressIconBtn(navNumber);
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
        <View style={{flex:1,flexDirection:"row"}}>
          <TouchableOpacity style={LNPStyles.navItem} onPress={this.onPressIconBtn.bind(this, 0)}>
            <Image source={require('assets/icons/tuijiandaikuan.png')}></Image>
            <Text style={{fontSize:12, color: "#333", marginTop:4}}>推荐贷款</Text>
          </TouchableOpacity>
          <TouchableOpacity style={LNPStyles.navItem} onPress={this.onPressIconBtn.bind(this, 1)}>
            <Image source={require('assets/icons/jisudaikuan.png')}></Image>
            <Text style={{fontSize:12, color: "#333", marginTop:4}}>极速贷款</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[LNPStyles.navItem]} onPress={this.onPressIconBtn.bind(this, 2)}>
            <Image source={require('assets/icons/chaxinyong.png')}></Image>
            <Text style={{fontSize:12, color: "#333", marginTop:4}}>查信用</Text>
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
    padding: 8,
    paddingLeft: 10, paddingRight: 10,
    height: 123,
    backgroundColor: "#FFF"
  },
  iptWrap: {
    backgroundColor: "#f2f2f2",
    height: 25,
    flex:3,
    borderTopLeftRadius:14,
    borderBottomLeftRadius: 14,
  },
  input: {
    paddingLeft: 12,
    height:25,
    paddingTop:0,paddingBottom:0
  },
  btnWrap: {
    flex:1,
    padding: 5,
    height: 25,
    backgroundColor: colors.secondary,
    borderTopRightRadius:14,
    borderBottomRightRadius: 14,
  },
  btn: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12
  },
  navItem: {flex:1, flexDirection:'column', justifyContent:'center', alignItems: 'center'}
});

module.exports = LoanNavPanel;
