import React, { Component } from 'react';

import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

import { headerHeight, statusBarHeight, centering } from 'styles';
import { ExternalPopLink } from 'containers/shared/Link';

export default class SceneHeader extends Component {
  static defaultProps = {
    title: ''
  };

  render() {
    return (
      <View style={styles.header}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
        {this._renderBack()}
        <View style={styles.center}><Text style={styles.title}>{this.props.title}</Text></View>
        {this._renderRight()}
      </View>
    );
  }

  _renderRight() {
    let { right: RightComponent } = this.props;

    if(!RightComponent) { return null }

    return (
      <View style={[centering, styles.right]}>
        <RightComponent {...this.props}/>
      </View>
    );
  }

  _renderBack() {
    let backRoute = this.props.backRoute;

    if(!backRoute || (backRoute.backCount === 0 && !backRoute.key)) {
      return null;
    }

    return (
      <View style={styles.left}>
        <ExternalPopLink {...this.props}>
          <View style={[styles.btn, centering]}>
            <Image source={require('assets/icons/back.png')}/>
          </View>
        </ExternalPopLink>
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
    fontSize: 18,
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
    right: 0,
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
  },
  btn: {
    height: 36,
    width: 60,
    paddingRight: 25,
  }
});
