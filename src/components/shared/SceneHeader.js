import React, { Component } from 'react';

import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

import { headerHeight, statusBarHeight, centering } from 'styles';
import Button from 'components/shared/ProcessingButton';

export default class SceneHeader extends Component {
  static defaultProps = {
    title: ''
  };

  render() {
    return (
      <View style={[styles.header,{backgroundColor : this.props.bgColor ? 'red' : '#fff'}]}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
        {this._renderBack()}
        <View style={styles.center}><Text style={[styles.title, {color : this.props.textColor ? this.props.textColor : '#333'}]}>{this.props.title}</Text></View>
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
    if(!this.props.onBack) { return null; }

    return (
      <View style={styles.left}>
        <Button onPress={this.props.onBack} >
          <View style={[styles.btn, centering]}>
            <Image source={require('assets/icons/back.png')}/>
          </View>
        </Button>
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
