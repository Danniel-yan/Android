import React, { Component } from 'react';
import { NetInfo, AppRegistry } from 'react-native';

import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from 'reducers';

// import codePush from "react-native-code-push";
import Main from 'containers/Main';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function supermarketjs() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

//NetInfo.fetch().done((reach) => {
//  if(/wifi/i.test(reach)) {
//    codePush.sync();
//  }
//});

AppRegistry.registerComponent('supermarketjs', () => supermarketjs);
