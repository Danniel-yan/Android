import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableWithoutFeedback 
} from 'react-native';


export default class MajorTabs extends Component {
  render() {
    let tabs = [{
      text: '首页',
      navigationKey: 'HomeScene'
    }, {
      text: '贷款',
      navigationKey: 'LoanScene'
    }, {
      text: '办卡',
      navigationKey: 'CardScene'
    }, {
      text: '我的',
      navigationKey: 'ZoneScene'
    }];

    return (
      <View style={[styles.tabs, this.props.style]}>
        {
          tabs.map((tab, index) => 
            <Tab key={`majorTab${index}`} onPress={this.props.onMajorTabChange} {...tab}/>)
        }
      </View>
    );
  }

}


class Tab extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
        <View style={styles.tab}>
          <Text style={[styles.tabFont, this.props.isActive && style.activeTabFont]}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _onPress() {
    this.props.onPress(this.props.navigationKey);
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 48
  },
  tab: {
    flex: 1,
    alignItems: 'center'
  },
  tabFont: {
    fontSize: 10,
    color: '#666'
  },
  activeTabFont: {
    color: '#FE271E'
  }
});
