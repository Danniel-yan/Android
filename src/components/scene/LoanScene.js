import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NavigationTest from 'components/NavigationTest';

export default class Loan extends Component {
  render() {
    return (
      <View style={{ marginTop: 100 }}>
        {this._renderHeader()}
        <Text>loan</Text>
        <View>
          <NavigationTest
            onExPush={this.props.externalPush}
            onExPop={this.props.externalPop}
            onPush={this.props.majorPush} onPop={this.props.majorPop}/>
        </View>
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.header}>
        <Text>hahahah</Text>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: 'yellow'
  }
});
