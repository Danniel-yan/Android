import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { ExternalPushLink } from 'containers/shared/Link';

import { window, responsive  } from 'styles';
import ResponsiveImage from 'components/shared/ResponsiveImage';

export default (props) => {
  let { to, image, ...imageProps } = props;

  return (
    <ExternalPushLink web={to}>
      <ResponsiveImage {...imageProps} uri={image} />
    </ExternalPushLink>
  );
}
