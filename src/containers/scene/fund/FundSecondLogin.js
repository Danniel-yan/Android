import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  Animated,
  Text,Modal,TextInput
} from 'react-native';

import ProcessingButton from 'components/shared/ProcessingButton';
import { post, responseStatus } from 'utils/fetch';
import { border, colors, fontSize } from 'styles';
import SceneHeader from 'components/shared/SceneHeader';

const sectionHeaderHeight = 30;
const sectionRowHeight = 40;
const rowBorderWidth = 0.5;

export default class FundSecondLoginScene extends Component{

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      value: '',
    };
  }

  render(){

    if(this.props.visible== false) return null;

    let hasImg = this.props.val_code.type == 'img';

    return(
      <Modal
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.props.onHide}
        onShow={() => this.setState({ visible: true})}>

        <View>
          <SceneHeader onBack={this.props.onHide} title="公积金查询"/>

          <View style={styles.inputGroup}>
            <Text style={styles.text}>{this.props.val_code.type == 'sms' ? '手机验证码': '图片验证码'}</Text>
            <TextInput value={this.state.value}
                       style={styles.input}
                       placeholder={'请输入'+ this.props.val_code.type == 'sms' ? '手机验证码': '图片验证码'}
                       underlineColorAndroid="transparent"
                       onChangeText={(value) => { this.setState({value}) }}
              />
            { hasImg ? <Image source={{uri: this.props.val_code.value}}/> :null }
          </View>
          <Text style={styles.error}>{this.state.error}</Text>

          <ProcessingButton
            color={colors.grayDark}
            processing={this.state.submitting}
            onPress={this._submit.bind(this)}
            disabeld={this.state.error}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            text="提交"
            />
        </View>

      </Modal>
    )
  }
  _submit(){

    let body = {
      ticket_id: this.props.ticket_id,
      value: this.state.value
    };

    this.setState({ submitting: true }, () => {

      post('/bill/gjj-second-login', body).then(response => {
        this.setState({ submitting: false});

        if(response.res == responseStatus.success) {
          this.setState({ submitting: false });

        } else {
          this.setState({ submitting: false, error: response.msg });
        }

      }).catch(err => {
        this.setState({ error: err, submitting: false})
      })
    });

  }

  _onFormChange(name, value) {
    if(typeof value == 'string') {
      value = value.trim();
    }

    this.formChanged = true;

    let errmsg = !value ? '请填写验证码' : '';

    this.setState({
      [name]: value
    });
  }

}

const styles = StyleSheet.create({
  sectionHeader: {
    height: sectionHeaderHeight,
    paddingTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'center'
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
  error: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.error,
    fontSize: fontSize.xsmall
  },
});

