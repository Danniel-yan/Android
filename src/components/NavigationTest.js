import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default class NavigationTest extends Component {
  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }

  _onExPush() {
    this.props.onExPush({key: 'NavigationTest'});
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
