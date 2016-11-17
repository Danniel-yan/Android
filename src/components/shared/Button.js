import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import { colors } from 'styles/varibles';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string
  };

  render() {
    let { style, ...props } = this.props;

    style = StyleSheet.flatten(style);
    let { fontSize, color, lineHeight, ...btnStyle } = style;

    return (
      <TouchableOpacity {...props} style={[styles.btn, btnStyle]}>
        {this._renderChildren({ fontSize, color, lineHeight })}
      </TouchableOpacity>
    );
  }

  _renderChildren(txtStyle) {
    if(this.props.children) {
      return this.props.children;
    }

    let style = {
      color: txtStyle.color || txtDefaultStyle.color,
      lineHeight: txtStyle.lineHeight || txtDefaultStyle.lineHeight,
      fontSize: txtStyle.fontSize || txtDefaultStyle.fontSize
    }

    return (
      <Text style={style}>{this.props.text}</Text>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    overflow: 'hidden',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const txtDefaultStyle = {
  lineHeight: 50,
  fontSize: 20,
  color: '#fff'
}
