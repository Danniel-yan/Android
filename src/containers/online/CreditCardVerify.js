import React, { Component } from 'react';

import {
  View,
  Platform,
  ScrollView,
  TouchableNativeFeeback,
  Image,
  TouchableOpacity,
  StyleSheet,
  ListView,
  Text,
} from 'react-native';

import { post, responseStatus } from 'utils/fetch';
import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import ProcessingButton from 'components/shared/ProcessingButton';
import onlineStyles from './styles';
import SceneHeader from 'components/shared/SceneHeader';
import { InputGroup } from 'components/form';
import { ExternalPushLink } from 'containers/shared/Link';
import ErrorInfo from './ErrorInfo';

export default class CreditCardVerify extends Component {

  constructor(props) {
    super(props);

    this.state = { val_code: '' };
  }

  render() {

    let disabled = this.state.val_code.length == 0;
    let hasImg = this.props.val_code.type == 'img';

    return (
      <ScrollView contentContainerStyle={onlineStyles.container}>
        <View style={[centering]}>
          {hasImg ? <Image style={styles.img} source={{uri: this.props.val_code.value}} /> : null}
        </View>

        <InputGroup
          valueChanged={this._inputChange.bind(this, 'val_code')}
          value={this.state.val_code}
          placeholder="请输入验证码"
          style={{input: styles.input}} />

        <ErrorInfo msg={this.state.error}/>

        <ExternalPushLink
          toKey="OnlineCreditCardStatus"
          title="导入账单"
          backCount={0}
          processing={this.state.submitting}
          prePress={this._submit.bind(this)}
          disabled={disabled}
          style={[onlineStyles.btn, disabled && onlineStyles.btnDisable]}
          textStyle={onlineStyles.btnText}
          text="立即导入"/>
      </ScrollView>
    );
  }

  _inputChange(name, value) {
    if(typeof value == 'string') {
      value = value.trim();
    }

    this.setState({[name]: value})
  }

  _submit() {
    this.setState({submitting: true});
    let body = {ticket_id: this.props.ticket_id, val_code: this.state.val_code};
    return post('/bill/bank-second-login', body).then(response => {
      this.setState({submitting: false});

      if(response.res == responseStatus.success) {
        return true;
      }

      throw response.msg;
    }).catch(err => {
      this.setState({submitting: false, error: err});
      throw err;
    });
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: fontSize.normal,
    textAlign: 'center'
  },
  img: {
    borderWidth: 1,
    borderColor: colors.line,
    width: 120,
    height: 50,
  }
});
