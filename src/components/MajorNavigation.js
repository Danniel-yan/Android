import React , { Component } from 'react';
import { View, NavigationExperimental, StyleSheet } from 'react-native';

import modules from 'containers/modules';
import MajorTabs from './MajorTabs';

const { CardStack: NavigationCardStack } = NavigationExperimental;

export default class MajorNavigation extends Component {
  render() {
    let { navigation } = this.props;
    let tabRoutes = navigation[navigation.curTab];
    let Compo = modules[tabRoutes.routes[0].key]

    return (
      <View style={styles.container}>
        <View style={styles.scene}>
          <Compo/>
        </View>
        <MajorTabs curTab={navigation.curTab} onMajorTabChange={this.props.majorTab}/>
      </View>
    );
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
