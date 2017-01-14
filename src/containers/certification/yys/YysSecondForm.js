import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Image,
  Keyboard,
  Animated,
  Text
} from 'react-native';

import Button from 'components/shared/ButtonBase';
import Input from 'components/shared/Input';
import ProcessingButton from 'components/shared/ProcessingButton';
import OverlayModal from 'components/modal/OverlayModal';
import { post, responseStatus } from 'utils/fetch';

import { window, border, fontSize, container, centering, colors, responsive } from 'styles';

const AnimatedView = Animated.View;
const needSecondLogin = 1;
const innerHeight = responsive.height(384);

export default class YysSecondForm extends Component {
  static defaultProps = {
    second_login: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      error: '',
      val_code: '',
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

  render() {

    return (
      <OverlayModal
        onHide={this.props.onHide}
        visible={this.props.visible}>

        <View style={[container, centering]}>
          <Animated.View style={[styles.container, {transform: [{translateY:this.state.pos}]}]}>

            <View style={[container, styles.body]}>
              <Text style={styles.header}>短信验证码</Text>

              <View style={styles.inputWrap}>
                <Input
                  style={[container, styles.input]}
                  onChangeText={this._onFormChange.bind(this, 'val_code')}
                />
              </View>

              <Text style={styles.error}>{this.state.error}</Text>
            </View>

            <ProcessingButton
              color={colors.grayDark}
              processing={this.state.submitting}
              onPress={this._submit.bind(this)}
              disabeld={this.state.error}
              style={styles.btn}
              textStyle={styles.btnText}
              text="提交"
            />

          <Button
            onPress={this.props.onHide}
            style={styles.close}><Image source={require('assets/online/close.png')}/></Button>
          </Animated.View>
        </View>

      </OverlayModal>
    );
  }

  _submit() {
    let body = {
      ticket_id: this.props.ticket_id,
      val_code: this.state.val_code
    };

    this.setState({ submitting: true }, () => {

      post('/bill/yys-second-login', body).then(response => {
        this.setState({ submitting: false});

        if(response.res == responseStatus.success) {
          this.setState({ submitting: false });
          this.props.verifySuccess(responseData);
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
  body: {
    ...border('bottom')
  },
  btn: {
    height: responsive.height(87),
  },
  btnText: {
    fontSize: fontSize.xlarge,
    color: colors.link
  },
  input: {
    textAlign: 'center',
    backgroundColor: '#F8F8F8',
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    borderRadius: 6
  },
  inputWrap: {
    height: responsive.height(80),
    paddingHorizontal: responsive.width(74)
  },
  error: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.error,
    fontSize: fontSize.xsmall
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 11
  }
});
