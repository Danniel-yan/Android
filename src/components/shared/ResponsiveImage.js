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
      dimension: dimensions[props.uri]
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
    let { uri, height, width, ...props } = this.props;

    if(!this.state.dimension && !height) { return null; }

    height = responsive.height(height || this.state.dimension.height)

    return (
      <Image {...props} style={{height}} source={{uri: uri}}/>
    );
  }
}
