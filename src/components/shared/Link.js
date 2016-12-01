import React, { Component, PropTypes } from 'react';
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
  static propTypes = {
    prePress: PropTypes.func
  };

  static defaultProps = {
    prePress: () => {}
  };

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

    Promise.resolve(this.props.prePress()).then(() => {
      onPress({
        title,
        key: toKey,
        component: toComponent,
        componentProps: this.props.componentProps
      });
    })
    .catch(console.log)
  }

  _createText() {

    return (
      <Text style={[defaultTxtStyle, this.props.textStyle]}>{this.props.text}</Text>
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