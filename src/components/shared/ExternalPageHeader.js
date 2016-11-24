import React, { Component } from 'react';

import {
  View,
  StatusBar,
  StyleSheet,
  NavigationExperimental
} from 'react-native';

const {
  Header: NavigationHeader
} = NavigationExperimental;

import Text from 'components/shared/Text';
import { headerHeight, statusBarHeight } from 'styles/varibles';

export default class ExternalPageHeader extends Component {
  static defaultProps = {
    title: ''
  };

  render() {
    return (
      <View style={styles.header}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
        {this._renderBack()}
        <View style={styles.center}><Text style={styles.title}>{this.props.title}</Text></View>
      </View>
    );
  }

  _renderBack() {
    if(!this.props.onBack) { return null; }

    return (
      <View style={styles.left}>
        <NavigationHeader.BackButton onPress={this.props.onBack}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    height: headerHeight,
    paddingTop: statusBarHeight,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6'
  },

  title: {
    fontSize: 19,
    color: '#333',
  },

  left: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: statusBarHeight
  },

  right: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    top: statusBarHeight,
  },

  center: {
    position: 'absolute',
    left: 80,
    right: 80,
    top: statusBarHeight,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
