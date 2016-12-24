import React, { Component, PropTypes } from 'react';

import ProcessingButton from 'components/shared/ProcessingButton';

export default class Link extends Component {
  render() {
    let { onPress, ...props } = this.props

    return (
      <ProcessingButton
        { ...props }
        onPress={this._onPress.bind(this)} />
    );
  }

  _onPress(prePressResult = {}) {
    let { onPress, toKey, toComponent, ...props } = this.props;
    onPress(Object.assign({
      ...props,
      key: toKey,
      component: toComponent
    }, prePressResult));
  }
}
