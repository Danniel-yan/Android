import React, { Component } from 'react';

import {
  Modal,
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  AppRegistry,
} from 'react-native';

import { allConfigs, switchEnvironment } from 'configs';
import { colors } from 'styles/varibles';

import CheckImage from 'assets/icons/check.png';
import Text from 'components/shared/Text';
import * as defaultStyles from 'styles';
import Button from 'components/shared/Button';

const Touchable = Platform.OS == 'ios' ? TouchableOpacity : TouchableNativeFeedBack;

export default class SecretGardenModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allConfigs: allConfigs()
    };
  }

  render() {
    return (
      <Modal
        animationType="fade"
        visible={this.props.visible}
        transparent={true}
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
        <Button onPress={this.props.onHidden} style={[styles.btn, styles.cancel]} text="取消"/>
        <View style={defaultStyles.container}/>
        <Button disable={this.state.submitting} onPress={this._submit.bind(this)} style={[styles.btn, styles.ok]} text="确认切换"/>
      </View>
    );
  }

  _submit() {
    if(this.state.submitting) { return }

    this.setState({
      submitting: true
    }, () => {
      this.setState({
        submitting: false
      });

      //switchEnvironment('production').then(() => {
      //});

    });

  }

  _renderEnvironments() {
    let configs = this.state.allConfigs;
    let environment = configs.environment;

    return Object.keys(configs).map(key => {
      if(key === 'environment') { return null; }

      let item = configs[key];

      return (
        <CheckboxRow
          key={`checkrow${key}`}
          onChecked={this._onRowChencked.bind(this)}
          environment={key}
          text={item.text}
          checked={this.state.environment ? this.state.environment === key : key === environment}
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
        <Touchable onPress={() => this.props.onChecked(this.props.environment) } style={styles.row}>
          <Text style={styles.txt}>{this.props.text}</Text>
          { this.props.checked && (<Image source={CheckImage }/>)}
        </Touchable>
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
    paddingHorizontal: 30,
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
    lineHeight: 30,
    width: 90,
    fontSize: 12,
    margin: 10,
    borderRadius: 4
  },

  cancel: {
    backgroundColor: colors.secondary,
  },

  ok: {
  }
});
