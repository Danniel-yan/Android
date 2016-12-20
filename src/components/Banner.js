import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { ExternalPushLink } from 'containers/shared/Link';

import { window, responsive  } from 'styles';

export default (props) => {
  let { height, to, image, ...imageProps } = props;

  return (
    <ExternalPushLink web={to}>
      <Image {...imageProps} source={{uri: image}} style={{width: window.width, height: responsive.height(height)}}/>
    </ExternalPushLink>
  );
}
