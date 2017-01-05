import { AsyncStorage, Platform } from 'react-native';
import { getAppSettings, environments } from 'settings';
import DeviceInfo from 'react-native-device-info';

import alert from './alert';

export const responseStatus = { failure: 0, success: 1 }
export const defaultApiVersion = '0.2';

let coords = null;
let initedApiParams = false;

let environment;
let apiParams = {
  app_version:  DeviceInfo.getVersion(),
  dev_id: DeviceInfo.getUniqueID(),
  os_version: DeviceInfo.getSystemVersion(),
  os_type: Platform.OS == 'ios' ? 2 : 1,
};
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
  console.log('api get request: ', url);
  return fetch(url, {
    method: 'get'
  })
  .then(response => response[responseType]())
  .then(log.bind(null, url, body));
}

function _post(url, body, responseType) {
  url = absoluteUrl(url);
  console.log('api post request: ', url);
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
  .then(response => response[responseType]())
  .then(log.bind(null, url, body));
}

function log(url, body, response) {
  console.log(url, body, response);
  return response;
}

function absoluteUrl(url) {
  let host = environment.api.replace(/\/$/, '');
  url = url.replace(/^\//, '');

  let params = queryParams();
  params += userToken ? `token=${userToken}` : ''

  let join = /\?/.test(url) ? '&' : '?';
  url = `${host}/${defaultApiVersion}/${url}${join}${params}`;


  return url;
}

function queryParams() {
  let query = ''
  for(let key in apiParams) {
    query += `${key}=${apiParams[key]}&`;
  }
  return query;
}

function setupParams() {
  if(environment) { return; }

  return AsyncStorage.getItem('environment')
    .then(env => environment = environments[env] || environments[environments.defaultEnvironment])
    .then(setApiParams)
    .then(setupCity)
}

function setApiParams() {

  if(initedApiParams) return;

  return getAppSettings().then(appSettings => {
    initedApiParams = true;

    apiParams.channel = appSettings.channel;
    apiParams.uuid = appSettings.uuid;
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

    apiParams.lati = coords.latitude;
    apiParams.long = coords.longitude;

  }, console.log, {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000})
}();

function setupCity() {
  return AsyncStorage.getItem('geoLocation').then(city => {
    apiParams.city = city || '';
  }).catch(console.log)
};
