import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import CountdownButton from './CountdownButton';
import { post, responseStatus } from 'utils/fetch';
import { colors } from 'styles';
import validators from 'utils/validators';

export default class VerifyButton extends Component {
  render() {
    let {
      style,
      textStyle,
      mobile,
      disabled,
      text,
      ...props
    } = this.props;

    let mobileValid = validators.mobile(mobile);

    return <CountdownButton
      ref="btn"
      {...props}
      disabled={!mobileValid || disabled}
      onPress={this._sendVerify.bind(this, mobile)}
      style={style || styles.verifyBtn}
      textStyle={textStyle || styles.verifyBtnTxt}
      defaultText={text || "获取验证码"}
      countdownText="${time}秒后可获取"/>
  }

  _sendVerify(mobile) {
    post('/tool/send-verify-code', { mobile })
      .then(res => {
        if(res.res == responseStatus.failure) {
          this.refs.btn.reset();
          this.props.onError && this.props.onError(res.msg);
        }
      })
      .catch(response => {
        console.log(response);
        this.props.onError && this.props.onError(response.msg)
      })
  }
}


const styles = StyleSheet.create({
  verifyBtn: {
    backgroundColor: colors.secondary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6
  },

  verifyBtnTxt: {
    fontSize: 12,
    color: '#fff'
  },
});
