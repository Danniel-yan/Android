import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  Text,
  StyleSheet
} from 'react-native';

const Touchable = Platform.OS == 'ios' ? TouchableOpacity : TouchableNativeFeedback;

import { colors } from 'styles/varibles';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string
  };

  render() {

    return Platform.OS == 'ios' ? this._renderIOS() : this._renderAndroid();
  }

  _renderAndroid() {
    let { style, ...props } = this.props;

    style = StyleSheet.flatten(style);
    let { fontSize, color, ...btnStyle } = style || {};

    return (
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={[styles.btn, btnStyle]}>
          {this._renderChildren({ fontSize, color })}
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderIOS() {
    let { style, ...props } = this.props;

    style = StyleSheet.flatten(style);
    let { fontSize, color, ...btnStyle } = style || {};

    return (
      <TouchableOpacity {...props}
        style={[styles.btn, btnStyle]}
        >
        {this._renderChildren({ fontSize, color })}
      </TouchableOpacity>
    );
  }

  _renderChildren(txtStyle) {
    if(this.props.children) {
      return this.props.children;
    }

    let style = {
      color: txtStyle.color || txtDefaultStyle.color,
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
  fontSize: 20,
  color: '#fff'
}
