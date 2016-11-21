import React , { Component } from 'react';
import { View, NavigationExperimental, StyleSheet } from 'react-native';

import modules from 'containers/modules';
import WebView from 'containers/shared/WebView';

const { CardStack: NavigationCardStack } = NavigationExperimental;

export default class ExternalNavigation extends Component {
  constructor(props) {
    super(props);

    this._renderScene = this._renderScene.bind();
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
