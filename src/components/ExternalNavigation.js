import React , { Component } from 'react';
import { View, NavigationExperimental, StyleSheet } from 'react-native';

import modules from 'containers/modules';

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
    let { key } = sceneProps.scene.route;
    let Component = modules[key];

    return (<Component/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
