import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { connect } from 'react-redux';

export function CertificationEntry(ElementComponent) {
  class CertificationEntryComponent extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      var navigation = this.props.navigation,
        idx = navigation.index, routes = navigation.routes;
      var key = routes && routes[idx] && routes[idx].key ? routes[idx].key : null;

      key && this.props.setEntryKey && this.props.setEntryKey(key);
    }

    render() {
      return React.createElement(ElementComponent, this.props);
    }
  }

  return connect(mapStateToEntryProps, mapDispatchToEntryProps)(CertificationEntryComponent);
}

function mapStateToEntryProps(store) {
  return { navigation: store.navigation };
}

function mapDispatchToEntryProps(dispatch) {
  return {
    setEntryKey: key => {dispatch({type: "SetEntryKey", key})},
    clearEntryKey: () => { dispatch({ type: "ClearEntryKey" }) }
  }
}

// ********************************************

export function CertificationOutput(ElementComponent) {
  class CertificationOutPutComponent extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      var entryKey = this.props.certificationEntryKey;
      entryKey && this.props.setBackRoute && this.props.setBackRoute({key: entryKey});
      // this.props.clearEntryKey && this.props.clearEntryKey(); // 清除 认证流程入口信息
    }

    componentWillUnmount() {
      this.props.unMountFetching && this.props.unMountFetching();
    }

    render() {
      return React.createElement(ElementComponent, this.props);
    }
  }

  return connect(mapStateToOutputProps, mapDispatchToOutputProps)(CertificationOutPutComponent);
}

function mapStateToOutputProps(state) {
  return {
    certificationEntryKey: state.certificationEntry
  }
}

function mapDispatchToOutputProps(dispatch) {
  return {
    setBackRoute: backRoute => { dispatch({type: "setCurrentBackRoute", backRoute}) },
    clearEntryKey: () => { dispatch({ type: "ClearEntryKey" }) }
  }
}
