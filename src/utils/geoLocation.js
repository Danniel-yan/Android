import { NativeModules } from 'react-native';

function parseLocationData(data) {
  return { coords: {
      latitude: data.Latitude,
      longitude: data.Longitude
  } };
}

export default function GetGeoLocation(options) {
  return new Promise((successFunc, errorFunc) => {
    var nativeModuleLocation = NativeModules.LocationModule ? NativeModules.LocationModule.getLocation : null;
    navigator.geolocation.getCurrentPosition(successFunc, nativeModuleLocation ? () => {
      nativeModuleLocation().then(parseLocationData).then(successFunc).catch(errorFunc);
    } : errorFunc)
  });
}
