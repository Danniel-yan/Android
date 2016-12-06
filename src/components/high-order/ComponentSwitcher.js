import React, { Component } from 'react';
import { Platform } from 'react-native';

export function DeviceSwitchComponent(AndroidCp, IOSCp) {
  return class SwitchComponent extends Component {
    render() {
      var ComponentClass = Platform.OS == 'android' ? AndroidCp : IOSCp;
      return ComponentClass ? React.createElement(ComponentClass, this.props) : null;
    }
  }
}

export function AsynDataSwitchComponent(componentSwitchFunc) {
  return class SwitchComponent extends Component {
    static propTypes = {
      fetching: PropTypes.func.isRequired,
      switchData: PropTypes.object.isRequired
    };

    componentDidMount() {
      !this.props.isFetched && this.props.fetching && this.props.fetching();
    }

    render() {
      var ComponentClass = componentSwitchFunc && componentSwitchFunc.call(this, this.props.switchData);
      return ComponentClass ? React.createElement(ComponentClass, this.props) : null;
    }
  }
}
