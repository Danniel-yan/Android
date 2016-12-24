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

import { post } from 'utils/fetch';
import { responsive, border, fontSize, flexRow, rowContainer, container, colors, centering } from 'styles';
import ProcessingButton from 'components/shared/ProcessingButton';
import onlineStyles from './styles';
import SceneHeader from 'components/shared/SceneHeader';
import { InputGroup } from 'components/form';

export default class CreditCardVerify extends Component {

  constructor(props) {
    super(props);

    this.state = { val_code: '' };
  }

  render() {

    let disabled = this.state.val_code.length > 0;
    let img = this.props.val_code.value;

    return (
      <ScrollView contentContainerStyle={onlineStyles.container}>
        <View style={[centering]}>
          {img ? <Image style={styles.img} source={{uri: img}} /> : null}
        </View>

        <InputGroup
          valueChanged={value => this.setState({val_code: value})}
          value={this.state.val_code}
          placeholder="请输入验证码"
          style={{input: styles.input}} />

        <ProcessingButton
          processing={this.state.submitting}
          onPress={this._submit.bind(this)}
          disabled={disabled}
          style={[onlineStyles.btn, disabled && onlineStyles.btnDisable]}
          textStyle={onlineStyles.btnText}
          text="立即导入"/>
      </ScrollView>
    );
  }

  _submit() {
    return;
    let body = {ticket_id: this.props.ticket_id, val_code: this.state.val_code};
    post('/bill/bank-second-login', body).then(response => {
      console.log(response);
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
