import React, { Component } from 'react';
import { View, ListView, Image ,StyleSheet,Text, TextInput, AsyncStorage, Modal, TouchableOpacity, Dimensions} from 'react-native';

import Button from 'components/shared/ButtonBase';
import zoneStyles from 'containers/scene/zone/zoneStyles';
import NextIcon from 'components/shared/NextIcon';
import { ExternalPushLink } from 'containers/shared/Link';
import Banner from 'containers/scene/home/Banner';
import validators from 'utils/validators';

import PayModal from 'components/modal/PayModal';

const {width, height } = Dimensions.get('window');

export default class blackListHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : '',
      ID : '',
      mobile : '',
      err : '',
      submitting : false,
      flags : false,
      payModalVisible: false
    }
  }
  render(){
    return(
      <View style = {{flex : 1, position: "relative"}}>
        <View style = {styles.top}>
          <Text style = {[styles.color,{marginBottom : 10}]}>网贷黑名单查询</Text>
          <View>
            <Text style = {{lineHeight : 20}}>查询网贷信用</Text>
            <Text style = {{lineHeight : 20}}>申请网贷被拒，可能不小心中了网贷征信的黑名单，建议关注您的网贷征信情况</Text>
          </View>
          <Text style = {[styles.color,{marginTop : 15}]}>我们提供付费代查网贷征信服务，查询费用3元／次</Text>
        </View>

        <View style = {styles.item}>
          <Text style = {styles.itemTitle}>真实姓名</Text>
          <View style = {styles.borderBottomStyle}>
            <TextInput
              placeholder = '请输入您的姓名'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={name => this.setState({name})}
            />
          </View>
        </View>
        <View style = {styles.item}>
          <Text style = {styles.itemTitle}>身份证号码</Text>
          <View style = {styles.borderBottomStyle}>
            <TextInput
              placeholder = '请输入身份证号码'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={ID => this.setState({ID})}
              maxLength = {18}
            />
          </View>
        </View>
        <View style = {styles.item}>
          <Text style = {styles.itemTitle}>手机号码</Text>
          <View style = {styles.borderBottomStyle}>
            <TextInput
              placeholder = '请输入您的手机号码'
              style = {styles.itemInput}
              underlineColorAndroid="transparent"
              clearButtonMode="while-editing"
              onChangeText={mobile => this.setState({mobile})}
              maxLength = {11}
            />
          </View>
        </View>

        <View style = {styles.btn}>
        <Button
          style={styles.submitBtn}
          onPress={() => {this._submit()}}>
          <Text style={styles.submitBtnText}>开始查询</Text>
        </Button>
        </View>
        {this._renderNavItem(require('assets/zone/contact.png'),'您可以通过完善你的信用资料，免费查询一次',{toKey : 'CreditLoan', title : '信用贷'})}
        {this._renderNavItem(require('assets/zone/contact.png'),'已有网贷征信报告',)}
        <View style = {{flex : 1, justifyContent : 'flex-end'}}>
            <Banner tracking={{key: 'credit_loan', topic: 'carousel_bottom'}} />
        </View>

        <View style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,height: this.state.payModalVisible ? null : 0, overflow: "hidden"}}>
          <PayModal close={() => this.setState({payModalVisible: false})} />
        </View>

      </View>
    )
  }

  _renderNavItem(icon, txt, navProps) {
    return (
      <ExternalPushLink
        {...navProps}>
        <View style={zoneStyles.item}>
          <Image style={zoneStyles.icon} source={icon}/>
          <Text style={[zoneStyles.txt,{fontSize:12,color:'blue'}]}>{txt}</Text>
          <NextIcon/>
        </View>
      </ExternalPushLink>
    )
  }

  renderItem(title,placeholder,value,maxLength){
    return (
      <View style = {styles.item}>
        <Text style = {styles.itemTitle}>{title}</Text>
        <View style = {styles.borderBottomStyle}>
          <TextInput
            placeholder = {placeholder}
            style = {styles.itemInput}
            underlineColorAndroid="transparent"
            clearButtonMode="while-editing"
            onChangeText={value => this.setState({value})}
            maxLength = {maxLength}
          />
        </View>
      </View>
    )
  }

  _validation() {
    let mobileValid = validators.mobile(this.state.mobile);
    let nameValid = this.state.name.length > 0;
    let IDValid = this.state.ID.length > 0;
    if(!nameValid) {
      this.setState({err: '请输入姓名'});
      return false;
    }

    if(!IDValid) {
      this.setState({err: '请输入身份证号码'});
      return false;
    }

    this.setState({err: ''});
    return true;
  }

  _submit() {
    if(!this._validation()) {
      console.log('yanzheng');
      console.log(this.state.mobile)
      return null;
    }

    this.setState({ payModalVisible : true });
  }


}

const styles = StyleSheet.create({
  modalContainer : {
    flex : 1,
    backgroundColor : 'rgba(0,0,0,0.5)',
    justifyContent : 'center',
    alignItems : 'center'
  },
  modalSubContainer : {
    width : 160,
    height : 110,
    backgroundColor : '#fff',
    padding : 10
  },
  modalTitle : {
    textAlign : 'center',
    marginBottom : 10
  },
  modalBottom : {
    borderTopWidth : 1,
    borderTopColor : '#cecece',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    paddingVertical : 10
  },
  btn : {
    paddingHorizontal : 10,
    borderBottomWidth : 1,
    borderBottomColor : '#cecece',
    paddingBottom : 5
  },
  color : {
    color : 'blue'
  },
  top : {
    paddingHorizontal : 10,
    paddingVertical : 20
  },
  item : {
    paddingLeft : 10,
    marginBottom : 10,

  },
  itemTitle : {
    marginBottom : 10,
  },
  itemInput : {
    fontSize : 12,
    height : 20,

  },
  borderBottomStyle : {
    borderBottomWidth : 1,
    borderBottomColor : '#cecece',
    height : 21
  },
  submitBtn: {
    marginTop: 10,
    height: 46,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  submitBtnText: {
    fontSize: 18,
    color: '#fff'
  },
})
