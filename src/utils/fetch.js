import { AsyncStorage } from 'react-native';

let environment;
let apiParams;

const headers = {
  'Content-Type': 'application/json'
};

export function post(url, body, responseType = 'json') {
  return Promise.resolve(setupParams()).then(() => _post(url, body, responseType))
}

function _post(url, body, responseType) {
  url = url.replace(/^\//, '');

  console.log(`${environment.api}${url}?${apiParams}`);
  return fetch(`${environment.api}${url}?${apiParams}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }).then(response => response[responseType]());
}


function setupParams() {
  if(environment) { return true; }

  return AsyncStorage.getItem('environment')
    .then(JSON.parse)
    .then(env => environment = env)
    .then(generateApiParams)
}

function generateApiParams() {
  return AsyncStorage.getItem('appSettings')
    .then(JSON.parse)
    .then(appSettings => {
      console.log('......', typeof appSettings);
      apiParams = `app_version=${appSettings.appVersion}&channel=${appSettings.channel}`;
      apiParams += `&dev_id=${appSettings.deviceId}&os_type=${appSettings.OS}`;
      apiParams += `&os_version=${appSettings.osVersion}&uuid=${appSettings.uuid}`;
    })
    .then(() => AsyncStorage.getItem('coords'))
    .then(coords => {
      apiParams += `&lati=${coords.latitude}&long=${coords.longitude}`;
    })
}
