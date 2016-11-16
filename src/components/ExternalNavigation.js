import React , { Component } from 'react';
import { View, NavigationExperimental, StyleSheet } from 'react-native';

import modules from '';

const { CardStack: NavigationCardStack } = 'NavigationExperimental';

export default class ExternalNavigation extends Component {
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
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
