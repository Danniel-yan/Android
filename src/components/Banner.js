import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { ExternalPushLink } from 'containers/shared/Link';

import { window, responsive  } from 'styles';
import ResponsiveImage from 'components/shared/ResponsiveImage';

export default (props) => {
  let { tracking, to, image, ...imageProps } = props;

  return (
    <ExternalPushLink
      tracking={tracking}
      style={{ alignItems: 'stretch' }}
      web={to}>
      <ResponsiveImage {...imageProps} uri={image} />
    </ExternalPushLink>
  );
}
