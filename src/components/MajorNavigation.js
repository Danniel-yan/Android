import React , { Component } from 'react';
import { View, NavigationExperimental, StyleSheet } from 'react-native';

import modules from 'containers/modules';
import MajorTabs from './MajorTabs';

const { CardStack: NavigationCardStack } = NavigationExperimental;

export default class MajoNavigation extends Component {
  render() {
    let { navigation } = this.props;
    let tabRoutes = navigation[navigation.curTab];

    return (
      <View style={styles.container}>
        <NavigationCardStack
          key={`major${navigation.curTab}`}
          navigationState={tabRoutes}
          renderScene={this._renderScene}
          style={styles.scene}
        />
        <MajorTabs curTab={navigation.curTab} onMajorTabChange={this.props.majorTab}/>
      </View>
    );
  }

  _renderScene(sceneProps) {
    let { key } = sceneProps.scene.route;
    let ComponentClass = modules[key];

    return (<ComponentClass/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1,
    // bottom tab height
    paddingBottom: 45
  }
});
