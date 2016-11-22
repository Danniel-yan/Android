import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { ExternalPushLink, ExternalPopLink, MajorPushLink, MajorPopLink } from 'containers/shared/Link';

export default class NavigationTest extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ExternalPushLink text="xiangqingye" toKey="LoanDetailScene" componentProps={{fetchingParams: { id: 1 }}} />
        <ExternalPopLink text="external link pop 一下"/>

        <MajorPushLink text="major link pop 一下" toKey="NavigationTest"/>
        <MajorPopLink text="major link pop 一下"/>
        <ExternalPushLink text="登录" toKey="Login"/>
        <ExternalPushLink text="用户信息" toKey="FillUserInfo"/>

      </ScrollView>
    );
  }

  _onExPush() {
    this.props.onExPush({key: 'NavigationTest'});
  }

  _onLogin() {
    this.props.onExPush({key: 'Login'});
  }

  _onExPop() {
    this.props.onExPop();
  }

  _onPush() {
    this.props.onPush({key: 'NavigationTest'});
  }

  _onPop() {
    this.props.onPop();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  row: {
    height: 60,
    borderColor: '#d9e939',
    borderBottomWidth: 2
  }
});
