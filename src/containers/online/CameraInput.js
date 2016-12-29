import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { centering, responsive, border, container, rowContainer, colors, fontSize } from 'styles';
const statusTexts = {
  success: '识别成功',
  failure: '识别失败',
};

export default class CameraInput extends Component {
  state = {
    status: ''
  };

  render() {
    let status = this.state.status;
    let statusText = status ? `${this.props.label}${statusTexts[status]}` : '';

    return (
      <View>
        <Text style={[styles.statusText, styles[status]]}>{statusText}</Text>
        <View style={styles.container}>
          <InputTouch label={this.props.label}/>
          <View style={[styles.example]}>
            <Text style={styles.exampleText}>示例</Text>
            <Image style={styles.exampleImage} source={this.props.example}/>
          </View>
        </View>
      </View>
    );
  }

}

function InputTouch(props) {
  return (
    <View style={[styles.touchWrap, centering]}>
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
