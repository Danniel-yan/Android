import React, { Component } from 'react';
import { View, Text } from 'react-native';

import NavigationTest from 'components/NavigationTest';

export default class Loan extends Component {
  render() {
    return (
      <View style={{ marginTop: 100 }}>
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
} 
