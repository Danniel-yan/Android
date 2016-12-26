import { AsyncStorage } from 'react-native';
import { getAppSettings, environments } from 'settings';

import alert from './alert';

export const responseStatus = { failure: 0, success: 1 }
export const defaultApiVersion = '0.2';

let coords = null;
let initedApiParams = false;

let environment;
let apiParams;
let userToken;

const headers = {
  'Content-Type': 'application/json'
};

export function get(url, body, responseType = 'json') {
  return Promise.resolve(setupParams())
    .then(setupUserToken)
    .then(() => _get(url, body, responseType));
}

export function post(url, body, responseType = 'json') {
  return Promise.resolve(setupParams())
    .then(setupUserToken)
    .then(() => _post(url, body, responseType));
}

function _get(url, body, responseType) {
  url = absoluteUrl(url);
  console.log('api request: ', url);
  return fetch(url, {
    method: 'get'
  })
  .then(response => response[responseType]())
  .then(requestFailureHandle);
}

function _post(url, body, responseType) {
  url = absoluteUrl(url);
  console.log('api request: ', url);
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
  .then(response => response[responseType]())
  .then(requestFailureHandle);
}

function requestFailureHandle(responseJSON) {
  if(typeof responseJSON == 'object' && responseJSON.res === responseStatus.failure) {
    alert(responseJSON.msg);
  }
  return responseJSON
}

function absoluteUrl(url) {
  url = url.replace(/^\/(-\/)?/, '');

  let hasVersion = /^(\d+(\.\d+)*\/)/.test(url);
  url = !hasVersion ? `${defaultApiVersion}/${url}` : url;
  let join = /\?/.test(url) ? '&' : '?';
  url = `${environment.api}${url}${join}${apiParams}`;

  url += userToken ? `token=${userToken}` : ''

  return url;
}


function setupParams() {
  if(environment) { return; }

  return AsyncStorage.getItem('environment')
    .then(env => environment = environments[env] || environments[environments.defaultEnvironment])
    .then(setApiParams)
}

function setApiParams() {

  if(initedApiParams) return;

  return getAppSettings().then(appSettings => {
    initedApiParams = true;

    apiParams = `app_version=${appSettings.appVersion}&channel=${appSettings.channel}&`;
    apiParams += `dev_id=${appSettings.deviceId}&os_type=${appSettings.OS}&`;
    apiParams += `os_version=${appSettings.osVersion}&uuid=${appSettings.uuid}&`;
  });


}

function setupUserToken() {
  return AsyncStorage.getItem('userToken').then(token => {
    userToken = token;
  });
}

void function setupLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    coords = position.coords;
    coords.longitude = Math.abs(coords.longitude);

    apiParams += `lati=${coords.latitude}&long=${coords.longitude}&`;

  }, console.log, {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000})
}();
