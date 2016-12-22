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
    if(!this.state.dimension) {
      Image.getSize(this.props.uri, (width, height) => {
        dimensions[this.props.uri] = {width, height};
        this.setState({dimension: {width, height}});
      })
    }
  }

  render() {
    if(!this.state.dimension) { return null; }
    let { uri, width, ...props } = this.props;
    let height = this.state.dimension.height;

    // 750就认为需要缩放
    if(width > 750) {
      height = responsive.height(this.state.dimension.height);
    }

    return (
      <Image {...props} style={{height}} source={{uri: uri}}/>
    );
  }
}
