import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Modal
} from 'react-native';

import * as defaultStyles from 'styles';

export default function(props) {
  return (
    <Modal
      transparent={true}
      animationType="fade" {...props} >
      <View style={[defaultStyles.container, defaultStyles.centering, styles.bg]}><ActivityIndicator color="white"/></View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(0,0,0,.2)'
  }
});
