import React, { Component } from 'react';

import {
  Modal,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  AppRegistry,
} from 'react-native';

import { colors } from 'styles/varibles';
import { environments, switchEnvironment } from 'settings';

import CheckImage from 'assets/icons/check.png';
import Text from 'components/shared/Text';
import * as defaultStyles from 'styles';
import Button from 'components/shared/ButtonBase';


export default class Confirm extends Component {

  render() {
    return (
      <Modal
        animationType="fade"
        visible={this.props.visible}
        transparent={true}
        onRequestClose={this.props.onCancel}
        >
        <View style={[styles.container, defaultStyles.container, defaultStyles.centering]}>
          <View style={styles.inner}>
            {this._renderTitle()}
            <View style={styles.content}>
              {this.props.children}
            </View>
            {this._renderFooter()}
          </View>
        </View>
      </Modal>
    );
  }

  _renderTitle() {
    if(!this.props.title) { return null }

    return (
      <View style={styles.header}><Text style={styles.title}>{this.props.title}</Text></View>
    )
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <Button onPress={this.props.onCancel} textStyle={[styles.btnTxt, styles.cancel]} style={[styles.btn]} text="取消"/>
        <Button onPress={this.props.onOK} textStyle={[styles.btnTxt, styles.ok]} style={[styles.btn]} text="确认"/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  inner: {
    width: defaultStyles.window.width * .8,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#fff',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 4,
  },
  header: {
    backgroundColor: 'red',
    marginBottom: 10,
  },
  title: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18
  },
  txt: {
    flex: 1,
    color: '#666'
  },
  content: {
    paddingVertical: 20,
  },
  footer: {
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    flexDirection: 'row',
  },

  btn: {
    padding: 20,
    marginLeft: 30
  },

  btnTxt: {
    fontSize: 14,
  },

  cancel: {
    color: '#666'
  },

  ok: {
    color: '#00B3FF'
  }
});
