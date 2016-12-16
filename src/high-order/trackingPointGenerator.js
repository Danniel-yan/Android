import React, { Component } from 'react';
import { connect } from 'react-redux';

import tracker from 'utils/tracker.js';


export default (Component) => {

  class Tracking extends Component {

    constructor(props) {
      super(props);

      this.navigation = props.navigation;
      this._stack = this._parseStack(props.navigation);
    }

    shouldComponentUpdate(nextProps) {
      if(this.isNavigationBack(nextProps.navigation, this.props.navigation)) {
        return false;
      }

      return nextProps.navigation == this.props.navigation;
    }

    render() {

      let { onPress, onBlur, tracking, ...props } = this.props;

      onPress && (props.onPress = this._actionHandle.bind(this));
      onBlur && (props.onBlur = this._actionHandle.bind(this));

      props.landing = this._landing.bind(this);

      return React.createElement(Component, {...props});
    }

    _actionHandle() {
      let { onPress, onBlur, tracking, ...props } = this.props;
      onPress && onPress.apply(null, arguments);
      onBlur && onBlur.apply(null, arguments);

      tracking && tracker.trackAction(Object.assign({event: 'clk'}, this._inhanceTracking(tracking)));
    }

    _landing(tracking) {
      tracker.trackAction(Object.assign({
        entity: '',
        topic: '',
        event: 'landing'
      }, this._inhanceTracking(tracking)));
    }

    _inhanceTracking(tracking) {
      return Object.assign({}, tracking, { route: this._stack });
    }

    _parseStack(navigation) {
      let routes = navigation.routes;
      let stack = [];

      stack.push(routes[0].curTab);

      routes.slice(1).forEach(route => {
        stack.push(route.web || route.key);
      })

      return stack.join('/')
    }

    isNavigationBack(nextNavigation, prevNavigation) {
      return prevNavigation.routes.length > nextNavigation.routes.length;
    }
  }

  function mapState(store) {
    return { navigation: store.navigation };
  }

  return connect(mapState)(Tracking);
}
