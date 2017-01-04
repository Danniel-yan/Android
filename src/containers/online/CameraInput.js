import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  NativeModules,
  StyleSheet,
} from 'react-native';

import ProcessingButton from 'components/shared/ProcessingButton';
import { centering, responsive, border, container, rowContainer, colors, fontSize } from 'styles';
import { post, responseStatus } from 'utils/fetch';

const statusTexts = {
  success: '识别成功',
  failure: '识别失败',
};

const typeToFn = {
  idFront: 'idCardVerifyFromFront',
  idBack: 'idCardVerifyFromFront',
  bankCard: 'bankCarddVerify'
}

export default class CameraInput extends Component {

  state = {
    status: '',
    submitting: false,
    value: null
  };

  render() {
    let status = this.state.status;
    let statusText = status ? `${this.props.label}${statusTexts[status]}` : '';

    return (
      <View>
        <Text style={[styles.statusText, styles[status]]}>{statusText}</Text>
        <View style={styles.container}>

        <ProcessingButton onPress={this._onPress.bind(this)} style={[styles.touchWrap, centering]}>
          { this.state.value ? <Image source={{uri:this.state.value.images[0]}}/> : <InputEmpty label={this.props.label}/>}
        </ProcessingButton>

          <View style={[styles.example]}>
            <Text style={styles.exampleText}>示例</Text>
            <Image style={styles.exampleImage} source={this.props.example}/>
          </View>
        </View>
      </View>
    );
  }

  _onPress() {
    NativeModules.FaceMegModule[typeToFn[this.props.type]]().then(res => {
      console.log(res);
      this.setState({
        value: res
      });
    });
  }

  _submit() {
  }
}

function InputEmpty(props) {
  return (
    <View style={[container, centering]}>
      <Image style={styles.touchIcon} source={require('assets/online/plus.png')}/>
      <Text style={styles.touchLabel}>{props.label}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    flexDirection: 'row',
  },
  example: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  exampleText: {
    width: responsive.width(230),
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 25,
    color: colors.grayLight
  },
  exampleImage: {
    width: responsive.width(230),
    height: responsive.height(142)
  },
  statusText: {
    textAlignVertical: 'center',
    height: 34,
    fontSize: fontSize.normal,
  },
  touchWrap: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#979797',
    width: responsive.width(410),
    height: responsive.height(288)
  },
  touchIcon: {
    marginBottom: responsive.height(40),
    width: responsive.width(70),
    height: responsive.height(70)
  },
  touchLabel: {
    textAlign: 'center',
    fontSize: fontSize.normal,
    color: colors.grayLight
  }
});
