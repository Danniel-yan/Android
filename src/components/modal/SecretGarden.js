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
import Button from 'components/shared/Button';


export default class SecretGardenModal extends Component {

  state = { environment: null };

  componentDidMount() {
    AsyncStorage.getItem('environment').then(environment => {
      this.setState({ environment });
    });
  }

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
            <Text style={styles.title}>警告！核武器！别乱选！</Text>
            {this._renderEnvironments()}
            {this._renderFooter()}
          </View>
        </View>
      </Modal>
    );
  }

  _renderFooter() {
    return (
      <View style={styles.footer}>
        <Button onPress={this.props.onCancel} textStyle={styles.btnTxt} style={[styles.btn, styles.cancel]} text="取消"/>
        <View style={defaultStyles.container}/>
        <Button disable={this.state.submitting} textStyle={styles.btnTxt} onPress={this._submit.bind(this)} style={[styles.btn, styles.ok]} text="确认切换"/>
      </View>
    );
  }

  _submit() {
    if(this.submitting) { return }

    this.submitting = true;

    switchEnvironment(this.state.environment)

  }

  _renderEnvironments() {
    let environment = this.state.environment;

    return Object.keys(environments).map(envName => {
      if(envName === 'defaultEnvironment') { return null; }

      let item = environments[envName];
      item.id = envName;

      return (
        <CheckboxRow
          key={`checkrow${envName}`}
          onChecked={this._onRowChencked.bind(this)}
          environment={item}
          text={item.text}
          checked={environment == envName}
          />
      );
    });
  }

  _onRowChencked(environment) {
    this.setState({ environment });
  }
}

class CheckboxRow extends Component {
  render() {
    return (
      <View style={styles.rowWrap}>
        <TouchableOpacity activeOpacity={1}  onPress={() => this.props.onChecked(this.props.environment.id) } style={styles.row}>
          <Text style={styles.txt}>{this.props.text}</Text>
          { this.props.checked && (<Image source={CheckImage }/>)}
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  inner: {
    height: defaultStyles.window.height * .8,
    width: defaultStyles.window.width * .8,
    padding: 20,
    backgroundColor: '#fff',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 4,
  },
  title: {
    marginBottom: 20,
    color: '#000',
    fontWeight: '700',
    fontSize: 18
  },
  rowWrap: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    height: 50,
  },
  txt: {
    flex: 1,
    color: '#666'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    flexDirection: 'row',
  },

  btn: {
    height: 30,
    width: 90,
    margin: 10,
    borderRadius: 4
  },

  btnTxt: {
    fontSize: 12,
  },

  cancel: {
    backgroundColor: colors.secondary,
  },

  ok: {
  }
});
