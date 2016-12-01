import React, { Component, PropTypes } from 'react';

import {
  WebView, Platform, NativeModules
} from 'react-native';
import * as defaultStyles from 'styles';

import AndroidWebView from 'components/shared/AndroidWebView';

export default function (config) {
  let { web, url } = config;
  url = web || url;
  if(!url) return null;

  return class InnerWebView extends Component {
    render() {
      return Platform.OS == 'android' ? (
        <AndroidWebView startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}></AndroidWebView>
      ) : (
        <WebView startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}/>
      );
    }
  }
}
