import { AsyncStorage, Platform } from 'react-native';

const environments = {
  defaultEnvironment: require('./dynamic/env'),
  production: {
    text: '生产环境',
    api: 'http://139.196.143.236:8001/'
  },
  test: {
    text: '内部用测试环境',
    api: 'http://139.196.143.236:8001/'
  }
};

const staticSettings = {
  appVersion: '0.0.1',
  OS: Platform.OS == 'ios' ? 2 : 1,
  osVersion: Platform.Version,
  channel: require('./dynamic/channel'),
  deviceId: '',
  uuid: '',
};

let environmentSettings;

export function applicationSetup() {
  setupLocation();

  return setupEnvironment()
    .then(setupUUID)
    .catch(err => { console.log(err) })
    .finally(() => {
      return AsyncStorage.setItem('appSettings', JSON.stringify(staticSettings));
    })
}

function setupUUID() {
  // TODO check local uuid
  return fetch(`${environmentSettings.api}-/user/uuid`)
    .then(response => response.json())
    .then(response => {

      if(response.res == 1) {
        staticSettings.uuid = response.data.uuid;
      }

      return ;
    })
}

function setupLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    const coords = position.coords;
    coords.longitude = Math.abs(coords.longitude);
    return AsyncStorage.setItem('coords', JSON.stringify(coords));
  }, err => {console.log(err)},
  {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000})
}

function setupEnvironment() {
  return AsyncStorage.getItem('environment')
    .then(environment => {
      if(environment == null || typeof environment == 'string') {
        environmentSettings = environments[environments.defaultEnvironment];
        return AsyncStorage.setItem('environment', JSON.stringify(environmentSettings));
      }

      environmentSettings = environments[environment];
    })
}

export function switchEnvironment(environment) {
  return AsyncStorage.setItem('environment', JSON.stringify(environments[environment]))
    .then(() => {
      // TODO restart
      return;
    });
}
