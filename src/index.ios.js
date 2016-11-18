import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from 'reducers';

import ExternalNavigationContainer from 'containers/ExternalNavigationContainer';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default class supermarketjs extends Component {
  render() {
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

AppRegistry.registerComponent('supermarketjs', () => supermarketjs);
