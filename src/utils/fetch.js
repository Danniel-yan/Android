import { AsyncStorage } from 'react-native';
import { requestStatus } from 'constants/api';

import alert from './alert';

const defaultApiVersion = '-';

let environment;
let apiParams;

const headers = {
  'Content-Type': 'application/json'
};

export function get(url, body, responseType = 'json') {
  return Promise.resolve(setupParams()).then(() => _get(url, body, responseType))
}

export function post(url, body, responseType = 'json') {
  return Promise.resolve(setupParams()).then(() => _post(url, body, responseType))
}

function _get(url, body, responseType) {
  return fetch(absoluteUrl(url), {
    method: 'get'
  })
  .then(response => response[responseType]())
  .then(requestFalireHandle);
}

function _post(url, body, responseType) {
  return fetch(absoluteUrl(url), {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
  .then(response => response[responseType]())
  .then(requestFalireHandle);
}

function requestFalireHandle(responseJSON) {
  if(typeof responseJSON == 'object' && responseJSON.res === requestStatus.falire) {
    alert(responseJSON.msg);
  }
  return responseJSON
}

function absoluteUrl(url) {
  url = url.replace(/^\/(-\/)?/, '');

  let hasVersion = /^(\d+(\.\d+)*\/)/.test(url);
  url = !hasVersion ? `${defaultApiVersion}/${url}` : url;
  return `${environment.api}${url}?${apiParams}`;
}

function setupParams() {
  if(environment) { return true; }

  return AsyncStorage.getItem('environment')
    .then(JSON.parse)
    .then(env => environment = env)
    .then(setApiParams)
}

function setApiParams() {
  return AsyncStorage.getItem('appSettings')
    .then(JSON.parse)
    .then(appSettings => {
      apiParams = `app_version=${appSettings.appVersion}&channel=${appSettings.channel}`;
      apiParams += `&dev_id=${appSettings.deviceId}&os_type=${appSettings.OS}`;
      apiParams += `&os_version=${appSettings.osVersion}&uuid=${appSettings.uuid}`;
    })
    .then(() => AsyncStorage.getItem('coords'))
    .then(coords => {
      if(coords) {
        apiParams += `&lati=${coords.latitude}&long=${coords.longitude}`;
      }
    })
    .catch(err => console.log(err))
}
