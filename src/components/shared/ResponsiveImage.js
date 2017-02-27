import React, { Component } from 'react';

import {
  Image,
  StyleSheet
} from 'react-native';

import { window, responsive } from 'styles';

let dimensions = {};

export default class ResponsiveImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimension: dimensions[props.uri] || null
    }
  }

  componentDidMount() {
    if(!this.state.dimension && !this.props.height) {
      Image.getSize(this.props.uri, (width, height) => {
        dimensions[this.props.uri] = {width, height};
        this.setState({dimension: {width, height}});
      })
    }
  }

  render() {
    let { uri, height, style, width, ...props } = this.props, dimension = this.state.dimension;

    if(!this.state.dimension && !height && !style) { return null; }

    height = responsive.height(height || (dimension ? dimension.height : null))

    return (
      <Image {...props} style={[{height}, style]} source={{uri: uri}}/>
    );
  }
}
