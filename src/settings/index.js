import { AsyncStorage } from 'react-native';
import configs from './environments';

export function applicationSetup() {
  return AsyncStorage.getItem('environment')
    .then(environment => {
      if(environment === null) {
        return AsyncStorage.setItem('environment', 'production')
          .then(() => {
            configs.environment = 'production';
            return configs;
          });
      }

      configs.environment = environment;
    })
}

export function allConfigs() {
  return configs;
}

export function config() {
  return configs[configs.environment] || configs['production'];
}

export function switchEnvironment(environment) {
  return AsyncStorage.setItem('environment', environment)
    .then(() => {
      configs.environment = environment;
      return configs;
    });
}
