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


export default class WebLink extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    let Com = this._generateComponent();

    return (
      <ExternalPushLink
        title={this.props.title}
        toKey={`webView${Date.now()}`}
        toComponent={Com} text="《钞市服务协议》"/>
    );
  }

  _generateComponent() {
    return null;
  }

  _webView() {
    let { url } = this.props;

    return class InnerWebView extends Component {

      render() {
        return (
          <WebView startInLoadingState={true} style={defaultStyles.container} source={{uri: url}}/>
        );
      }
    }

  }

}


