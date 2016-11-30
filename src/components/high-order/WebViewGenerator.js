import React, { Component, PropTypes } from 'react';
import {
  WebView
} from 'react-native';
import * as defaultStyles from 'styles';

export default function (config) {
  let { web, url } = config;
  url = web || url;
  if(!url) return null;

  return class InnerWebView extends Component {
    render() {
      return (
        <WebView startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}/>
      );
    }
  }
}
