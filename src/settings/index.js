import { AsyncStorage, Platform, NativeModules } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import tracker from 'utils/tracker.js';
// import codePush from "react-native-code-push";
import alert from 'utils/alert';

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
    api: 'https://shiyishou-test.jujinpan.cn/'
  },
  uat: {
    id: 'uat',
    text: 'UAT',
    api: 'https://shiyishou-uat.jujinpan.cn/'
  }
};

const staticSettings = {
  channel: '',
  uuid: '',
};

let environmentSettings;

export function applicationSetup() {

  return setupEnvironment()
    .then(setupChannel)
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


function setupChannel() {
  if(Platform.OS == 'ios') {
    staticSettings.channel = "appstore";
    return;
  }

  return NativeModules.ChannelModule.getChannel().then(channel => {
    staticSettings.channel = channel;
  }).catch(console.log);
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

          if(response.res == 1) {
            staticSettings.uuid = response.data.uuid;
            tracker.user_id = response.data.uuid;
            return AsyncStorage.setItem('uuid', response.data.uuid);
          }

        })
  })
  .then(() => {
    NativeModules.JpushModule.setAlias(staticSettings.uuid.replace(/-/g, ''));
  })
}

/**
 * 环境配置： 生产／测试／
 */
function setupEnvironment() {
  return AsyncStorage.getItem('environment')
    .then(environment => {
      let envName = environment || environments.defaultEnvironment;

      environmentSettings = environments[envName];
      return AsyncStorage.setItem('environment', envName);
    })
}

export function switchEnvironment(environment) {
  return AsyncStorage.removeItem('userToken').then(() => {
    AsyncStorage.setItem('environment', environment)
    .then(() => {
      // codePush.restartApp();
      alert("请重新启动App");
    })
  });
}
