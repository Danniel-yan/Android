import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet } from 'react-native';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import reducers from 'reducers';

import * as defaultStyles from 'styles';
import ExternalNavigationContainer from 'containers/ExternalNavigationContainer';
import { applicationSetup } from 'settings'
import codePush from "react-native-code-push";
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class supermarketjs extends Component {
  constructor(props) {
    super(props);
    this.state = { initialing: true, updating:true};
  }

  componentDidMount() {
      applicationSetup().then(() => {
        this.setState({ initialing: false });
      });
  }

  render() {
    if(this.state.initialing) {
      return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image source={require('assets/icons/init_loader.gif')} />
      </View>
      );
    }

    return (
        <Provider store={store}>
          <ExternalNavigationContainer/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('supermarketjs', () => codePush(supermarketjs));