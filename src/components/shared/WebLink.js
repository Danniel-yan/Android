import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import externalScene from 'components/high-order/externalScene';
import { ExternalPushLink } from 'containers/shared/Link';

import {
  WebView
} from 'react-native';

import Link from './Link';
import * as defaultStyles from 'styles';

import { externalPop } from 'actions/navigation';
import WebViewGenerator from 'components/high-order/WebViewGenerator';


export default class WebLink extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    let Com = WebViewGenerator(this.props);

    return (
      <ExternalPushLink
        {...this.props}
        toKey={`webView${Date.now()}`}
        toComponent={Com} />
    );
  }
}
