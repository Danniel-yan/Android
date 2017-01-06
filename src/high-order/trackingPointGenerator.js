import React, { Component } from 'react';
import { connect } from 'react-redux';

import tracker from 'utils/tracker.js';

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

  _parseStack(navigation) {
    let routes = navigation.routes;
    let stack = [];

    stack.push(routes[0].curTab);

    routes.slice(1).forEach(route => {
      stack.push(encodeURIComponent(route.web || route.key));
    })

    return stack.join('/')
  }

  _inhanceTracking(tracking) {
    return Object.assign({}, tracking, { route: this._stack });
  }


  isNavigationBack(nextNavigation, prevNavigation) {
    return prevNavigation.routes.length > nextNavigation.routes.length;
  }
}


/**
 * 目前仅支持带有tracking属性或tracking方法的组件。
 * 无法作用于HOC。
 * 多层HOC时,请将trackingScene放到紧挨原始Component的地方调用。
 *
 * @param
 * ComponentClass: 需要做track landing和unlanding的组件。必须包含tracking属性
 * ComponentClass.tracking
 *    string: 作为track key使用
 *    object: {key: string, entity: string, topic: string, ...extend}
 *    function: return object;
 *
 * @example: connect()(otherHOC(trackingScene(Component)))
 *
 * TODO 支持HOC, 使用ref串联rendered element
 */
export function trackingScene(ComponentClass) {

  class TrackingScene extends Tracking {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      let tracking = this._findTrackingConfig();
      this.landingTime = Date.now();

      tracking && tracker.trackAction(Object.assign({
        entity: '',
        topic: '',
        event: 'landing'
      }, this._inhanceTracking(tracking)));
    }

    componentWillUnmount() {
      let tracking = this._findTrackingConfig();

      tracking && tracker.trackAction(Object.assign({
        entity: '',
        topic: '',
        event: 'unlanding',
        duration: Date.now() - this.landingTime
      }, this._inhanceTracking(tracking)));
    }

    render() {
      let { navigation, ...props } = this.props;

      return <ComponentClass ref={child => this.child = child} {...props} />;
    }

    _findTrackingConfig() {
      if(this.found) { return this.childTracking; }

      this.found = true;
      return this.childTracking = this._componentTrackingConfig(this.child);
    }

    _componentTrackingConfig(component) {
      if(!component) { return }

      if(typeof component.tracking == 'function') {
        return component.tracking()
      }

      if(typeof component.tracking == 'object') {
        return component.tracking;
      }

      if(typeof component.tracking == 'string') {
        return { key: component.tracking };
      }

      //let children = component.props.children;
      //if(!children || children.length == 0) { return; }

      //for(let i, len = children.length; i < len; i++) {
      //  let tracking = this._componentTrackingConfig(children[index]);

      //  if(tracking) {
      //    return tracking;
      //  }
      //}
    }
  }

  return connect(mapState)(TrackingScene);
}


export default (ComponentClass) => {

  class TrackingPoint extends Tracking {

    render() {
      let { navigation, onPress, onBlur, tracking, ...props } = this.props;

      props.onPress = this._onPress.bind(this);
      props.onBlur = this._onBlur.bind(this);

      return <ComponentClass {...props} />;
    }

    _onBlur() {
      let { onBlur, tracking, ...props } = this.props;
      let event = { event: 'blur' };

      onBlur && onBlur.apply(null, arguments);

      tracking && tracker.trackAction(Object.assign(event, this._inhanceTracking(tracking)));
    }

    _onPress() {
      let { onPress, onBlur, tracking, ...props } = this.props;
      let event = { event: 'clk' };

      onPress && onPress.apply(null, arguments);

      tracking && tracker.trackAction(Object.assign(event, this._inhanceTracking(tracking)));
    }

  }

  return connect(mapState)(TrackingPoint);
}


function mapState(store) {
  return { navigation: store.navigation };
}

