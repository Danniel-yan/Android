import React, { Component } from 'react';

import {
  Image,
  StyleSheet
} from 'react-native';

import { window, responsive } from 'styles';

export default class RemoteImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    Image.prefetch(this.props.uri).then(this.loaded.bind(this))
  }

  loaded() {
    this.timer = setTimeout(() => {
      !this.unmount && this.setState({ loaded: true })
    }, 50);
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  render() {
    let { uri, ...props } = this.props;

    if(!this.state.loaded) {
      return ( <Image {...props} resizeMode="center" source={require('assets/default.png')}/>);
    }

    return ( <Image {...props} source={{uri: uri}}/>);
  }
}
