import React, { Component } from 'react';
import Text from 'components/shared/Text';
import {
  View,
  Image,
  StyleSheet,
  Button,
  TouchableWithoutFeedback
} from 'react-native';

import { IOSComponentSwitcher } from 'components/high-order/ComponentSwitcher';

import { colors } from 'styles/varibles';

import iconHome from 'assets/tab-icons/home.png';
import iconLoan from 'assets/tab-icons/loan.png';
import iconCard from 'assets/tab-icons/card.png';
import iconZone from 'assets/tab-icons/zone.png';

import iconHomeActive from 'assets/tab-icons/home_active.png';
import iconLoanActive from 'assets/tab-icons/loan_active.png';
import iconCardActive from 'assets/tab-icons/card_active.png';
import iconZoneActive from 'assets/tab-icons/zone_active.png';

let tabs = [{
  text: '首页',
  icon: iconHome,
  activeIcon: iconHomeActive,
  sceneKey: 'HomeScene'
}, {
  text: '贷款',
  icon: iconLoan,
  activeIcon: iconLoanActive,
  sceneKey: 'LoanScene'
}, {
  text: '办卡',
  icon: iconCard,
  activeIcon: iconCardActive,
  sceneKey: 'CardScene'
}, {
  text: '我的',
  icon: iconZone,
  activeIcon: iconZoneActive,
  sceneKey: 'ZoneScene'
}];


class MajorTabs extends Component {

  render() {
    var iconCardSceneForHide = this.props.isIOSVerifying ? "CardScene" : null;

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

export default IOSComponentSwitcher(MajorTabs);

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
