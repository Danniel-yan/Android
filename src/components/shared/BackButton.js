import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  Image,
  StyleSheet
} from 'react-native';

import { colors } from 'styles/varibles';
import * as defaultStyles from 'styles';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  render() {
    return (
      <TouchableOpacity {...this.props}
        activeOpacity ={1}
        >
        <View style={[styles.btn, defaultStyles.centering]}>
          <Image source={require('assets/icons/back.png')}/>
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  btn: {
    height: 36,
    width: 60,
    paddingRight: 25,
  }
});
