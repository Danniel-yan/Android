import React, { Component } from 'react';
import { View ,StyleSheet, Text, TextInput, AsyncStorage} from 'react-native';

import VerifyButton from 'components/shared/VerifyButton';
import { ExternalPushLink } from 'containers/shared/Link';
import ProcessingButton from 'components/shared/ProcessingButton';
import validators from 'utils/validators';
import { post, responseStatus } from 'utils/fetch';
import fetchingUser from 'actions/loginUser';
import { externalPop } from 'actions/navigation';
import { colors } from 'styles/varibles'

export default class findLogin extends Component {
  constructor (props){
    super(props);
    this.state = {
      mobile : '',
      verifyCode : '',
      submitting : false,
      err : '',
    }
  }
  render(){
    return (
      <View style = {styles.containers}>
        <View style={styles.itemGroup}>
          <Text style = {styles.itemTitle}>手机号</Text>
          <View style = {{flexDirection : 'row'}}>
            <View style = {styles.borderBottomStyle}>
            <TextInput
              clearButtonMode="while-editing"
              keyboardType="numeric"
              placeholder="请输入手机号"
              maxLength={11}
              underlineColorAndroid="transparent"
              onChangeText={mobile => this.setState({mobile})}
              style = {styles.itemInput}
            />
            </View>
            <VerifyButton
              tracking={{key: 'user', topic: 'login', entity: 'mob_code_button'}}
              mobile={this.state.mobile}
              style = {styles.verifyCode}
              textStyle = {{color : 'blue'}}
              text ='验证码'
            />
          </View>
        </View>
        <View style={styles.itemGroup}>
          <Text style = {styles.itemTitle}>验证码</Text>
          <View style = {{flexDirection : 'row'}}>
            <View style = {styles.borderBottomStyle}>
            <TextInput
              clearButtonMode="while-editing"
              keyboardType="numeric"
              placeholder="请输入验证码"
              maxLength={6}
              value={this.state.verifyCode}
              underlineColorAndroid="transparent"
              onChangeText={verifyCode => this.setState({verifyCode})}
              style = {styles.itemInput}
            />
            </View>
            <View style = {{width : 110}}></View>
          </View>
        </View>
        <View style={styles.txtRow}>
          {this.state.err ? <Text style={styles.err}>{this.state.err}</Text> : null}
        </View>
        <ProcessingButton
          tracking={{key: 'user', topic: 'login', entity: 'login_button', cell: this.state.mobile}}
          processing={this.state.submitting} onPress={this._submit.bind(this)}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          text="登录"/>
      </View>
    )
  }

  _validation() {
    let mobileValid = validators.mobile(this.state.mobile);
    let codeValid = this.state.verifyCode.length > 0;

    if(!mobileValid) {
      this.setState({err: '请输入11位手机号'});
      return false;
    }

    if(!codeValid) {
      this.setState({err: '请输入验证码'});
      return false;
    }

    this.setState({err: ''});
    return true;
  }

  _submit() {
    if(!this._validation()) {
      return null;
    }
    if(this.submitting) { return; }
    this.submitting = true;
    this.setState({
      submitting: true
    }, () => {
      let { mobile, verifyCode: verify_code } = this.state;
      post('/user/login', { mobile, verify_code })
        .then(response => {
          if(response.res == responseStatus.success) {
            return AsyncStorage.setItem('userToken', response.data.token)
          } else {
            throw response.msg;
          }
        })
        .then(this.loginSuccess.bind(this))
        .catch(err => { console.log(err); })
        .finally(() => {
          this.submitting = false;
          this.setState({submitting: false})
        })
    });
  }

  loginSuccess() {
    this.props.dispatch(fetchingUser());

    if(this.props.loginSuccess) {
      this.props.loginSuccess();
    } else {
      this.props.dispatch(externalPop());
    }
  }

}


const styles = StyleSheet.create({
  containers : {
    flex : 1,
    padding : 20,
    backgroundColor : '#fff',
    paddingTop : 50
  },
  itemGroup : {
    paddingLeft : 10,
    marginBottom : 10,

  },
  itemTitle : {
    marginBottom : 10,
  },
  itemInput : {
    fontSize : 12,
    height : 25,
  },
  input : {
    flex : 1,
  },
  verifyCode : {
    width : 110,
    borderWidth : 1,
    borderColor : 'blue',
    borderRadius : 5,
    padding : 5

  },
  borderBottomStyle : {
    borderBottomWidth : 1,
    borderBottomColor : '#cecece',
    height : 26,
    flex : 1,
    marginRight : 5
  },
  submitBtn: {
    marginTop: 50,
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
  err: {
    marginTop: 20,
    color: colors.error
  },
  txtRow: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center'
  },
})

