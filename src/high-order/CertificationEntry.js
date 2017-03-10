import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { connect } from 'react-redux';

export default function CertificationEntryGenerator(ElementComponent) {
  class CertificationEntry extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log(this.props);
      var navigation = this.props.navigation,
        idx = navigation.index, routes = navigation.routes;
      var key = routes && routes[idx] && routes[idx].key ? routes[idx].key : null;

      key && this.props.setEntryKey && this.props.setEntryKey(key);
    }

    render() {
      return React.createElement(ElementComponent, this.props);
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(CertificationEntry);
}

function mapStateToProps(store) {
  return { navigation: store.navigation };
}

function mapDispatchToProps(dispatch) {
  return {
    setEntryKey: key => {dispatch({type: "SetEntryKey", key})}
  }
}
