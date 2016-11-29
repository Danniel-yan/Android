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

const { CardStack: NavigationCardStack } = NavigationExperimental;

export default class ExternalNavigation extends Component {

  componentWillMount() {
    if(Platform.OS == 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._handleAndroidhardwareBack.bind(this));
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

    if(++this.hardwareBackPressTimes == 2) {
      return false;
    }

    alert('请再按一次返回键退出钞市');

    // 两秒内点击两次回退按钮推出应用
    setTimeout(() => {
      this.hardwareBackPressTimes = 0;
    }, 2000);
    return true;
  }

  componentWillReceiveProps(nextProps) {
    // TODO, safe push/pop
    let navigation= this.props.navigation;
    let nextNavigation = nextProps.navigation;

    if(!navigation) { return ;}

    if(nextNavigation.index > navigation.index) {
      this.nav.push(nextNavigation.routes[nextNavigation.index])
    } else if(nextNavigation.index < navigation.index) {
      this.nav.pop()
    }
  }

  _renderScene(route, navigator) {
    let { web, key, title, component: ComponentClass, componentProps } = route;

    if(!ComponentClass) {
      ComponentClass = modules[key];
    }

    if(route.index !== 0) {
      ComponentClass = externalScene(ComponentClass, title);
    }

    return React.createElement(ComponentClass , { ...componentProps, navigator});
  }

  render() {
    return (
      <Navigator
        ref={nav => this.nav = nav}
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
