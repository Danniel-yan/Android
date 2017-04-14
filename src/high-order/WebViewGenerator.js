import React, { Component, PropTypes } from 'react';

import {
  WebView, Platform, NativeModules
} from 'react-native';
import * as defaultStyles from 'styles';
import { trackingScene } from './trackingPointGenerator';


let AndroidWebView;

if(Platform.OS == 'android') {
  AndroidWebView = require('components/shared/AndroidWebView');
}

export default function (config) {
  let { web, url } = config;
  const source = typeof web == 'object' ? web : { uri: web || url };

  class InnerWebView extends Component {
    constructor(props) {
      super(props);

      let tracking = props.tracking || { key: 'webview' };
      this.tracking = Object.assign({URL: web || url || ''}, tracking, { key: encodeURIComponent(tracking.key)});
    }

    render() {
      return !(Platform.OS == 'ios') ? this._renderAndroid() : this._renderIOS();
    }

    _renderAndroid() {
      return (
        <AndroidWebView startInLoadingState={true} style={defaultStyles.container} source={source} onMessage={this.props.onMessage}></AndroidWebView>
      );
    }

    _renderIOS() {
      return (
        <WebView startInLoadingState={true} style={defaultStyles.container} source={source}></WebView>
      );
    }
  }

  return trackingScene(InnerWebView);
}
