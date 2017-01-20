import React, { Component } from 'react';

import ProcessingButton from 'components/shared/ProcessingButton';
import { ExternalPushLink } from 'containers/shared/Link';
import onlineStyles from './styles';

export default function({disabled, ...props}) {

  if(props.toKey) {
    return (
      <ExternalPushLink
        {...props}
        disabled={disabled}
        style={[onlineStyles.btn, disabled && onlineStyles.btnDisable]}
        textStyle={onlineStyles.btnText}
        />
    );
  }

  return (
    <ProcessingButton
      {...props}
      disabled={disabled}
      style={[onlineStyles.btn, disabled && onlineStyles.btnDisable]}
      textStyle={onlineStyles.btnText}
      />
  );
}
