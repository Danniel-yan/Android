import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

import * as styles from 'styles';

export default (props) => {
  return (
    <View style={[styles.container, styles.centering]}>
      <Image source={require('assets/icons/init_loader.gif')} />
    </View>
  );
}
