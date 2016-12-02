import { AsyncStorage, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import tracker from 'utils/tracker.js';
import codePush from "react-native-code-push";

export const environments = {
  defaultEnvironment: require('./dynamic/env'),
  production: {
    id: 'production',
    text: '生产环境',
    api: 'https://chaoshi-api.jujinpan.cn/'
  },
  test: {
    id: 'test',
    text: '内部用测试环境',
    api: 'http://139.196.143.236:8001/'
  }
};

const staticSettings = {
  appVersion: '0.0.1',
  OS: Platform.OS == 'ios' ? 2 : 1,
  osVersion: Platform.OS == 'ios' ? 'ios' : Platform.Version,
  channel: require('./dynamic/channel'),
  deviceId: DeviceInfo.getUniqueID(),
  uuid: '',
};

let environmentSettings;

export function applicationSetup() {

  return setupEnvironment()
    .then(setupUUID)
    .catch(err => { console.log(err) })
}

export function getAppSettings() {
  return new Promise((resolve, reject) => {
    checkUUID();

    function checkUUID() {
      if(staticSettings.uuid) {
        return resolve(staticSettings);
      }

      setTimeout(checkUUID, 50);
    }
  });
}

function setupUUID() {
  return AsyncStorage.getItem('uuid')
    .then(uuid => {
      if(uuid) {
        staticSettings.uuid = uuid;
        tracker.user_id = uuid;
        return;
      }

      return fetch(`${environmentSettings.api}-/user/uuid`)
        .then(response => response.json())
        .then(response => {
          console.log(response);

          if(response.res == 1) {
            staticSettings.uuid = response.data.uuid;
            tracker.user_id = uuid;
            return AsyncStorage.setItem('uuid', response.data.uuid);
          }

        })
  })
}

/**
 * 环境配置： 生产／测试／
 */
function setupEnvironment() {
  return AsyncStorage.getItem('environment')
    .then(environment => {
      let envName = environments.defaultEnvironment;

      // 重置json模式的缓存
      if(environment && !/^\{/.test(environment)) {
        envName = environment;
      }

      environmentSettings = environments[envName];
      return AsyncStorage.setItem('environment', envName);
    })
}

export function switchEnvironment(environment) {
  return AsyncStorage.removeItem('userToken').then(() => {
    AsyncStorage.setItem('environment', environment)
    .then(() => {
      codePush.restartApp();
    })
  });
}
