import React, { Component } from 'react';
import { View, Text, ScrollView , TextInput, StyleSheet } from 'react-native';

import * as defaultStyles from 'styles';
import SceneHeader from 'components/shared/SceneHeader';

import ProcessingButton from 'components/shared/ProcessingButton'
import { colors } from 'styles/varibles'

export default class FundScene extends Component{

  constructor(props){
    super(props);

    this.state = {
      city: '', type: '',account:'',password:'',code:'',
      submitting: false
    };

  }

  render(){
    let { city, type , account, password, code} = this.state;

    return(
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>请选择城市</Text>
          <TextInput value={city}
                     style={styles.input}
                     placeholder='请选择您所在的城市'
                     underlineColorAndroid="transparent"
                     onChangeText={this._inputChange.bind(this, 'city')}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>登陆类型</Text>
          <TextInput value={type}
                     style={styles.input}
                     placeholder='请选择你的登陆类型'
                     underlineColorAndroid="transparent"
                     onChangeText={this._inputChange.bind(this, 'type')}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>账户</Text>
          <TextInput value={account}
                     style={styles.input}
                     placeholder="请输入您的账户名"
                     underlineColorAndroid="transparent"
                     onChangeText={this._inputChange.bind(this, 'account')}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>密码</Text>
          <TextInput value={password}
                     style={styles.input}
                     placeholder="请输入您的密码"
                     underlineColorAndroid="transparent"
                     onChangeText={this._inputChange.bind(this, 'password')}
            />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>验证码</Text>
          <TextInput value={code}
                     style={styles.input}
                     placeholder="请输入右侧验证码"
                     underlineColorAndroid="transparent"
                     onChangeText={this._inputChange.bind(this, 'code')}
            />
        </View>

        <View style={{justifyContent: 'center',alignItems: 'center',}}>
          <ProcessingButton
            processing={this.state.submitting}
            onPress={this._submit.bind(this)}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            text="提交"/>
        </View>
      </View>

    )
  }

  _inputChange(field, value) {
    this.setState({ [field]: value });
  }

  _submit() {

    if(this.submitting) { return; }

    this.submitting = true;

    this.setState({
      submitting: true
    }, () => {


    });
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1
  },
  inputGroup: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingHorizontal:10
  },
  input: {
    flex: 1,
    marginLeft: 18,
    marginRight: 10,
    fontSize: 12,
    color: '#A5A5A5',
    backgroundColor: '#fff'
  },
  text:{
    fontSize:12,
    color:'#727272',
    width:70
  },
  submitBtn: {
    marginTop: 50,
    height: 40,
    backgroundColor: '#FF003C',
    borderRadius: 4,
    width:250
  },
  submitBtnText: {
    fontSize: 20,
    color: '#fff',

  },
})