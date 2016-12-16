import React, { Component } from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';

import Text from 'components/shared/Text';
import * as defaultStyles from 'styles';

export default class About extends Component {
  render() {
    return (
      <View style={defaultStyles.container}>
        <ScrollView>
          <View style={styles.container}>
            <Image style={styles.logo} source={require('assets/logo.png')}/>
            <Text style={styles.title}>你的办卡贷款市场</Text>

            <Text style={styles.content}>为你推荐最适合的借款平台，定制最优借款方案，极速解决你的资金需求</Text>
            <Text style={styles.content}>提供在线免费申请、快速办理信用卡服务</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  logo: {},
  title: {
    marginTop: 10,
    marginBottom: 40,
    fontSize: 18,
    color: '#333'
  },
  content: {
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
    fontSize: 16,
    color: '#666'
  }
});
