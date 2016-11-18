import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Text from './Text';
import { colors } from 'styles/varibles';

export default class Link extends Component {
  render() {
    let { text, onPress, link, children, ...props } = this.props

    if(!children) {
      children = this._createText();
    }

    return (
      <TouchableOpacity onPress={this._onPress.bind(this)} { ...props }>
        {children}
      </TouchableOpacity>
    );
  }

  _onPress() {
    let { onPress, toKey } = this.props;
    onPress({ key: toKey });
  }

  _createText() {
    let txtStyle = defaultTxtStyle;

    let { fontSize, color, lineHeight } = StyleSheet.flatten(this.props.style || {});
    this._setAttr(txtStyle, 'color', color);
    this._setAttr(txtStyle, 'fontSize', fontSize);
    this._setAttr(txtStyle, 'lineHeight', lineHeight);

    return (
      <Text style={txtStyle}>{this.props.text}</Text>
    );
  }

  _setAttr(obj, key, value) {
    if(value) {
      obj[key] = value;
    }
    return obj;
  }
}

const defaultTxtStyle = {
  color: colors.secondary
}
