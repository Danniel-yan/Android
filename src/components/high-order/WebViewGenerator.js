import React, { Component, PropTypes } from 'react';

import {
  WebView, Platform, NativeModules
} from 'react-native';
import * as defaultStyles from 'styles';


let AndroidWebView;

if(Platform.OS == 'android') {
  AndroidWebView = require('components/shared/AndroidWebView');
}

export default function (config) {
  let { web, url } = config;
  url = web || url;
  if(!url) return null;

  return class InnerWebView extends Component {
    render() {
      return !(Platform.OS == 'ios') ? (
        <AndroidWebView startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}></AndroidWebView>
      ) : (
        <WebView startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}></WebView>
      );
    }
  }
}
