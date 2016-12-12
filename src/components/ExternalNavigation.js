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
import externalScene from 'containers/externalScene';
import WebViewGenerator from 'components/high-order/WebViewGenerator';

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

    alert('请再按一次返回键退出钞市');

    // 连续两次回退按钮推出应用
    this.exitTimer = setTimeout(() => {
      this.hardwareBackPressTimes = 0;
    }, 2000);
    return true;
  }

  componentWillReceiveProps(nextProps) {
    // TODO, safe push/pop

    let routes = this.nav.getCurrentRoutes();
    let nextNavigation = nextProps.navigation;

    if(routes.length > nextNavigation.routes.length) {
      this.nav.pop()
    } else if(routes.length < nextNavigation.routes.length) {
      this.nav.push(nextNavigation.routes[nextNavigation.index])
    } else if(routes.slice(-1)[0].key != nextNavigation.routes.slice(-1)[0].key) {
      this.nav.replace(nextNavigation.routes[nextNavigation.index]);
    }

  }

  _renderScene(route, navigator) {
    let { web, key, title, component: ComponentClass, componentProps } = route;

    if(web && !ComponentClass) {
      ComponentClass = WebViewGenerator(route);
    }

    if(!ComponentClass) {
      ComponentClass = modules[key];
    }

    if(route.index !== 0) {
      ComponentClass = externalScene(ComponentClass, title);
    }

    return React.createElement(ComponentClass , { ...componentProps, navigator});
  }

  _handleIOSBack(route, navigator) {
    if(!this.nav) { return }

    let externalRoutes = this.props.navigation.routes;
    let routes = this.nav.getCurrentRoutes();

    if(externalRoutes.length > routes.length) {
      this.props.externalPop();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Navigator
        onDidFocus={this._handleIOSBack.bind(this)}
        ref={nav => this.nav = nav}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        initialRoute={{key: 'MajorNavigation', index: 0}}
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
