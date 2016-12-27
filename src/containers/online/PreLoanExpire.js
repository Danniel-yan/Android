import React, { Component } from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import { ExternalPopLink } from 'containers/shared/Link';
import RecommendListPanel from 'containers/scene/home/RecommendListContainer';
import { container, colors, fontSize, centering} from 'styles';
import onlineStyles from './styles';

export default function(props) {
  return (
    <ScrollView>
      <View style={[styles.banner, centering]}>
        <Image style={styles.img} source={require('assets/online/info.png')}/>
        <Text style={styles.tip}>抱歉，您的预授信额度已过期</Text>
        <Text style={styles.tip}>如需要，请重新申请</Text>
      </View>

      <Text style={styles.header}>预授信详情</Text>

      <View style={styles.item}>
        <Text style={[styles.text, container]}>预受额度：</Text>
        <Text style={styles.text}>50,000.00</Text>
      </View>

      <View style={styles.item}>
        <Text style={[styles.text, container]}>预受额度：</Text>
        <Text style={styles.text}>50,000.00</Text>
      </View>

      <View style={styles.item}>
        <Text style={[styles.text, container]}>预受额度：</Text>
        <Text style={styles.text}>50,000.00</Text>
      </View>

      <ExternalPopLink
        style={[onlineStyles.btn, {marginHorizontal: 10, marginTop: 80}]}
        textStyle={onlineStyles.btnText}
        toKey="CertificationHome"
        text="重新申请"/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: '#f1f1f1'
  },
  img: {
    marginBottom: 16,
  },
  tip: {
    textAlign: 'center',
    marginHorizontal: 80,
    fontSize: fontSize.large,
    color: colors.grayDark
  },
  header: {
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#f1f1f1',
    color: colors.gray
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10
  },
  text: {
    fontSize: fontSize.large,
    color: colors.grayDark
  }
});
