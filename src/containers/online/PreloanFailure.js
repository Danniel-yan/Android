import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import Banner from './Banner';
import { container, colors, fontSize, centering} from 'styles';

export default function(props) {
  return (
    <ScrollView>
      <Banner
        icon={require('assets/online/info.png')}
        text="很遗憾，您的申请未通过"
      />

      <View style={styles.header}><Text>您可以选择其他贷款</Text></View>

      <RecommendListPanel/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#f1f1f1'
  },
});
