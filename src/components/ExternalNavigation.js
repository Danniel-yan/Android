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

    return false;
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

    if(web) {
      return React.createElement(WebView, {
        source: {uri: web}
      });
    }

    if(!ComponentClass) {
      ComponentClass = modules[key];
    }

    return React.createElement(ComponentClass, { ...componentProps, title });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
