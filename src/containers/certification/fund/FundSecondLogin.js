import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  Animated,
  Text,Modal,TextInput
} from 'react-native';

import Input from 'components/shared/Input';

import ProcessingButton from 'components/shared/ProcessingButton';
import { post, responseStatus } from 'utils/fetch';
import SceneHeader from 'components/shared/SceneHeader';
import OverlayModal from 'components/modal/OverlayModal';


import { window, border, fontSize, container, centering, colors, responsive } from 'styles';

const sectionHeaderHeight = 30;
const sectionRowHeight = 40;
const rowBorderWidth = 0.5;

const AnimatedView = Animated.View;
const needSecondLogin = 1;
const innerHeight = responsive.height(384);

export default class FundSecondLoginScene extends Component{

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      error: '',
      value: '',
      pos: new Animated.Value(0)
    };
  }

  componentDidMount() {
    let windowHeight = window.height;
    let orgPos = (windowHeight - innerHeight) / 2;

    Keyboard.addListener('keyboardWillShow', (e) => {
      let keyboardHeight = e.endCoordinates.height;

      let pos = (windowHeight - (keyboardHeight + innerHeight));

      Animated.timing(this.state.pos, {
        toValue: pos - orgPos,
        duration: 200
      }).start();
    });

    Keyboard.addListener('keyboardWillHide', (e) => {
      Animated.timing(this.state.pos, {
        toValue: 0,
        duration: 200
      }).start();
    });
  }

  render(){

    if(this.props.visible == false) return null;

    let hasImg = this.props.val_code.type == 'img';

    return(
      <OverlayModal
        onHide={this.props.onHide}
        visible={this.props.visible}>

        <View style={[container, centering]}>
          <Animated.View style={[styles.container, {transform: [{translateY:this.state.pos}]}]}>

            <View style={[container]}>
              <Text style={styles.header}>{!hasImg ? '手机验证码': '图片验证码'}</Text>

              <View style={[styles.inputWrap, { flexDirection: "row" }]}>
                <Input
                  style={[container, styles.input]}
                  onChangeText={this._onFormChange.bind(this, 'value')}
                />
                { hasImg ? <Image style={{flex: 1}} source={{uri: "data:image/png;base64," + this.props.val_code.value}}/> :null }
              </View>

              <Text style={styles.error}>{this.state.error}</Text>
            </View>

            <ProcessingButton
              processing={this.state.submitting}
              onPress={this._submit.bind(this)}
              disabeld={this.state.error}
              style={styles.submitBtn}
              textStyle={styles.submitBtnText}
              text="提交"
              />
            </Animated.View>
        </View>

      </OverlayModal>
    )
  }
  _submit(){

    let body = {
      ticket_id: this.props.ticket_id,
      val_code: this.state.value
    };
    if(!body.val_code) return;
    this.setState({ submitting: true }, () => {

      post('/bill/gjj-second-login', body).then(response => {
        this.setState({ submitting: false});

        if(response.res == responseStatus.success) {
          this.setState({ submitting: false });
          this.props.verifySuccess();
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
      [name]: value,
      error: errmsg
    });
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 10,
    width: responsive.width(602),
    height: innerHeight
  },
  header: {
    marginVertical: responsive.height(50),
    textAlign: 'center',
    fontSize: fontSize.xlarge,
    color: colors.grayDark
  },
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
  inputWrap: {
    height: responsive.height(80),
    paddingHorizontal: responsive.width(74)
  },
  input: {
    textAlign: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    borderRadius: 6
  },
  submitBtn: {
    marginTop: 50,
    height: 40,
    borderRadius: 4,
    ...border('top')
  },
  submitBtnText: {
    fontSize: 20,
    color: '#1A91FE',
  },
  error: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.error,
    fontSize: fontSize.xsmall
  },
});
