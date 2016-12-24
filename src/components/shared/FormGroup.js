
import React, { Component } from 'react'; 
import {
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import { border, colors } from 'styles';
import Text from 'components/shared/Text';
import * as defaultStyles from 'styles';

export default class FormGroup extends Component {
  render() {
    return (
      <View style={[defaultStyles.container, styles.formGroup, this.props.style]}>
        <View style={styles.controlLabel}><Text style={styles.label}>{this.props.label}</Text></View>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  formGroup: {
    height: 55,
    backgroundColor: '#fff',
    ...border('bottom'),
  },

  controlLabel: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },

  label: {
    fontSize: 16,
    color: '#666',
  },

  formControl: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 10
  },

});
