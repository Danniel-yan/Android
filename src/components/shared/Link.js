import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
  StyleSheet
} from 'react-native';

import Text from './Text';
import { colors } from 'styles/varibles';

export default class Link extends Component {

  render() {
    return Platform.OS == 'ios' ? this._renderIOS() : this._renderAndroid();
  }

  _renderAndroid() {
    let { text, onPress, link, children, style, ...props } = this.props

    if(!children) {
      children = this._createText();
    }

    return (
      <TouchableNativeFeedback
        onPress={this._onPress.bind(this)}
        {...props}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={style}>
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderIOS() {
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
    let { onPress, toKey, toComponent, title } = this.props;

    onPress({
      title,
      key: toKey,
      component: toComponent,
      componentProps: this.props.componentProps
    });
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
