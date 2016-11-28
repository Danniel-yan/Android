import React , { Component } from 'react';
import {
  BackAndroid,
  View,
  NavigationExperimental,
  StyleSheet,
  Platform
} from 'react-native';

import modules from 'containers/modules';
import WebView from 'containers/shared/WebView';
import alert from 'utils/alert';
import externalScene from 'containers/externalScene';

const { CardStack: NavigationCardStack } = NavigationExperimental;

export default class ExternalNavigation extends Component {
  constructor(props) {
    super(props);

    this._renderScene = this._renderScene.bind();
  }

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

  render() {
    let { navigation } = this.props;

    return (
      <NavigationCardStack
        key="supermarketNavigation"
        navigationState={navigation}
        renderScene={this._renderScene}
      />
    );
  }

  _renderScene(sceneProps) {
    let { web, key, title, component: ComponentClass, componentProps } = sceneProps.scene.route;


    if(!ComponentClass) {
      ComponentClass = modules[key];
    }

    if(sceneProps.scene.index > 0) {
      ComponentClass = externalScene(ComponentClass, title);
    }

    return React.createElement(ComponentClass , { ...componentProps});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
