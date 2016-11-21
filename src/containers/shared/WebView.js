import React, { Component } from 'react';
import { WebView } from 'react-native';

import externalScene from 'components/high-order/externalScene';

export default externalScene(React.createElement(WebView, {
  startInLoadingState: true,
  style: {flex: 1},
}));
