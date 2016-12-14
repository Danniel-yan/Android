import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  Text,
  StyleSheet
} from 'react-native';

import { colors } from 'styles/varibles';
import trackingPointGenerator from 'components/high-order/trackingPointGenerator';

class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string
  };

  render() {
    return Platform.OS == 'ios' ? this._renderIOS() : this._renderAndroid();
  }

  _renderAndroid() {
    let { children, style, ...props } = this.props;

    return (
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={style}>
          {this._renderChildren()}
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderIOS() {
    let { children, ...props } = this.props;

    return (
      <TouchableOpacity
        {...props}
        activeOpacity ={0.7}
        >
        {this._renderChildren()}
      </TouchableOpacity>
    );
  }

  _renderChildren() {
    if(this.props.children) {
      return this.props.children;
    }

    return (
      <Text style={this.props.textStyle}>{this.props.text}</Text>
    );
  }
}

export default trackingPointGenerator(Button);
