import React, { Component } from 'react';
import { WebView } from 'react-native';

import externalScene from 'components/high-order/externalScene';

class DefaultWebView extends WebView {
  static defaultProps = {
    startInLoadingState: true,
    style: {flex: 1},
  };
}
export default DefaultWebView;
