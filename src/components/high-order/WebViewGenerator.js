import React, { Component, PropTypes } from 'react';

import {
  WebView, Platform, NativeModules
} from 'react-native';
import * as defaultStyles from 'styles';

export default function (config) {
  let { web, url } = config;
  url = web || url;
  if(!url) return null;

  return class InnerWebView extends Component {
    render() {
      return Platform.OS == 'android' && NativeModules.NativeWebViewModule ? (
        <NativeModules.NativeWebViewModule startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}></NativeModules.NativeWebViewModule>
      ) : (
        <WebView startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}/>
      );
    }
  }
}
