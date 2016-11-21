import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { ExternalPushLink, ExternalPopLink, MajorPushLink, MajorPopLink } from 'containers/shared/Link';

export default class NavigationTest extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ExternalPushLink text="xiangqingye" toKey="LoanDetailScene" componentProps={{fetchingParams: { id: 1 }}} />
        <ExternalPopLink text="external link pop 一下"/>
        <MajorPushLink text="major link pop 一下" toKey="NavigationTest"/>
        <MajorPopLink text="major link pop 一下"/>

        <TouchableHighlight onPress={this._onPush.bind(this)} style={styles.row}>
          <Text> push 一下 只能点一下，第二下别点了报错, 点pop吧</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPop.bind(this)} style={styles.row}>
          <Text> pop 一下 </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._onExPush.bind(this)} style={styles.row}>
          <Text> external push  一下 </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._onExPop.bind(this)} style={styles.row}>
          <Text> external pop  一下 </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._onLogin.bind(this)} style={styles.row}>
          <Text> 登录 </Text>
        </TouchableHighlight>
      </View>
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
