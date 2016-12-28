import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import { container, colors, fontSize, centering} from 'styles';

export default function(props) {
  return (
    <View style={[container]}>
      <ScrollView>
        <View style={centering}>
          <Image source={require('assets/online/info.png')}/>
          <Text style={styles.text}>很遗憾，您的申请未通过</Text>
        </View>

        <View style={styles.header}><Text>您可以选择其他贷款</Text></View>

        <RecommendListPanel/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 16,
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  header: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#f1f1f1'
  },
});
