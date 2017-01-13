import React , { Component } from 'react';
import {
  BackAndroid,
  View,
  NavigationExperimental,
  StyleSheet,
  Navigator,
  Platform
} from 'react-native';

import modules from 'containers/modules';
import WebView from 'containers/shared/WebView';
import alert from 'utils/alert';
import externalScene from 'high-order/externalScene';
import WebViewGenerator from 'high-order/WebViewGenerator';

const { CardStack: NavigationCardStack } = NavigationExperimental;

export default class ExternalNavigation extends Component {

  constructor(props) {
    super(props);

    this._handleAndroidhardwareBack = this._handleAndroidhardwareBack.bind(this);
  }

  componentWillMount() {
    this.hardwareBackPressTimes = 0;

    if(Platform.OS == 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._handleAndroidhardwareBack);
    }
  }

  componentWillUnmount() {
    if(Platform.OS == 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this._handleAndroidhardwareBack);
    }
  }

  _handleAndroidhardwareBack() {
    let { navigation } = this.props;
    let route = navigation.routes[0];
    let majorRoute = route[route.curTab];

    if(navigation.index > 0) {
      this.props.externalPop();
      return true;
    } else if(majorRoute.index > 0) {
      this.props.majorPop();
      return true;
    }

    clearTimeout(this.exitTimer);

    if(++this.hardwareBackPressTimes >= 2) {
      return false;
    }

    alert('再按一次退出钞市应用');

    // 连续两次回退按钮推出应用
    this.exitTimer = setTimeout(() => {
      this.hardwareBackPressTimes = 0;
    }, 2000);
    return true;
  }

  componentWillReceiveProps(nextProps) {
    // TODO, safe push/pop

    let nextNavigation = nextProps.navigation;

    let routes = this.nav.getCurrentRoutes();
    let nextRoute = nextNavigation.routes

    const curLength = routes.length;
    const nextLength = nextRoute.length;

    if(curLength > nextLength) {
      const nextLastRoute = nextRoute[nextLength - 1];
      const curLastRoute = routes[curLength - 1];

      if(nextLastRoute != curLastRoute) {
        this.nav.replacePreviousAndPop(nextLastRoute);
      } else {
        this.nav.popN(curLength - nextLength);
      }

    } else if(curLength < nextLength) {

      this.nav.push(nextNavigation.routes[nextNavigation.index])

    } else if(routes.slice(-1)[0].key != nextNavigation.routes.slice(-1)[0].key) {
      this.nav.replace(nextNavigation.routes[nextNavigation.index]);
    }

  }

  _renderScene(route, navigator) {
    let {
      web,
      key,
      title,
      component: ComponentClass,
      RenderedComponent,
      componentProps
    } = route;

    // 若route已经渲染过，则直接使用旧component，避免重新渲染
    if(RenderedComponent) {
      ComponentClass = RenderedComponent;
    } else {

      if(!ComponentClass) {
        ComponentClass = web ? WebViewGenerator(route) : modules[key];
      }

      // append scene header
      if(route.index !== 0 && !ComponentClass.external) {
        ComponentClass = externalScene(ComponentClass);
      }

      // 由于React Native Navigator 在push或pop时会调用两次renderScene: prev route及next route;
      // 这里缓存prev route component到route中。
      // 避免每次生产新component导致push或pop时, prev component销毁并重新渲染
      route.RenderedComponent = ComponentClass;
    }

    return React.createElement(ComponentClass , { ...componentProps, navigator, sceneTitle: title });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let initRoute = this.props.navigation.routes[0]

    const FloatFromRight = {
      ...Navigator.SceneConfigs.FloatFromRight,
      gestures: {pop: { disabled: true }},
    };

    return (
      <Navigator
        ref={nav => this.nav = nav}
        configureScene={() => FloatFromRight}
        initialRoute={initRoute}
        renderScene={this._renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
