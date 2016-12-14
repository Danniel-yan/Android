import React, { Component } from 'react';
import Text from 'components/shared/Text';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableWithoutFeedback
} from 'react-native';

import { IOSComponentSwitcher } from 'high-order/ComponentSwitcher';

import { colors } from 'styles/varibles';

class MajorTabs extends Component {

  render() {
    var iconCardSceneForHide = this.props.isIOSVerifying ? "CardScene" : null,
      nav = this.props.nav, tabs =  [];

    for(var key in nav) {
      if(typeof nav[key] == "object" && typeof nav[key].icon) tabs.push(Object.assign({}, nav[key], {sceneKey: key}));
    }

    return (
      <View>

        <View style={[styles.tabs, this.props.style]}>
          {
            tabs.map((tab, index) => {
              if(tab.sceneKey === iconCardSceneForHide)
                return null;
              return <Tab isActive={this.props.curTab == tab.sceneKey } key={`majorTab${index}`} onPress={this.props.onMajorTabChange} {...tab}/>;
            })
          }
        </View>

        <View style={styles.bg}/>

      </View>
    );
  }

}

export default IOSComponentSwitcher(MajorTabs, null);

class Tab extends Component {
  render() {
    let props = this.props;

    return (
      <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
        <View style={styles.tab}>
          <Image source={props.isActive ? props.activeIcon : props.icon}/>
          <Text style={[styles.tabFont, props.isActive && styles.activeTabFont]}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _isActive() {
  }

  _onPress() {
    this.props.onPress(this.props.sceneKey);
  }
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    backgroundColor: '#fff',
    height: 46,
    borderTopWidth: 1,
    borderTopColor: colors.line
  },
  tabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingBottom: 8,
    height: 55,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  tabFont: {
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
    backgroundColor: '#fff',
    lineHeight: 12
  },
  activeTabFont: {
    color: colors.primary
  }
});
