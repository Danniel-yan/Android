import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

import Text from 'components/shared/Text';
import { responsive, container, colors } from 'styles';
import Dimensions from 'Dimensions';

export default (props) => {
  let { style } = props;

  return (
    <View style={[styles.panel, style]}>
      <Image source={{uri: props.pic_card}} style={styles.logo}/>

      <View style={container}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.title}>{props.name}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.info}>{props.info}</Text>
        <Text style={styles.tip}><Text style={{color: colors.primary}}>{props.num}</Text>人申请</Text>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  panel: {
    backgroundColor:'#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  logo:{
    width: responsive.width(256),
    height: responsive.height(160),
    marginRight: responsive.height(30)
  },
  title: {
    color: '#333',
    fontSize: 17,
    marginBottom: 12
  },
  info: {
    marginBottom: 12,
    fontSize: 14,
    color: '#999'
  },
  tip: {
    color: '#333',
    fontSize: 14,
  }
})
