import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import Banner from './Banner';
import { border, centering, colors, fontSize } from 'styles';

export default function(props) {
  return (
    <ScrollView>

      <Banner
        icon={require('assets/online/approve-success.png')}
        text="恭喜，您已成功签约"
        footer="钱款将于1-3个工作日打到您填写的储蓄银行卡中，请知悉！"
      />

      <View style={styles.footer}>
        <Text style={styles.text}>
          如有疑问欢迎拨打：<Text style={styles.cell}>4009160160</Text>
        </Text>
        <Text style={styles.text}>或添加“中腾信金融”公众号咨询</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    marginTop: 55,
  },
  text: {
    marginBottom: 3,
    textAlign: 'center',
    fontSize: fontSize.xlarge,
    color: colors.grayDark
  },
  cell: {
    color: colors.link
  }
});