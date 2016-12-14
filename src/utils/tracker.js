import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';
import { NativeModules } from 'react-native';
import { getAppSettings } from 'settings';

const TRACKER_CONFIG = {
    "BASIC_URL":"https://mdt.jujinpan.cn",
    "APP":"chaoshi"
};

let channel;

const BASE_INFO = {
    "DEVICE_UUID":DeviceInfo.getUniqueID(),
    "MANUFACTURER": DeviceInfo.getManufacturer(),
    "MODEL": DeviceInfo.getModel(),
    "VERSION": DeviceInfo.getSystemVersion(),
    "APP_VERSION": DeviceInfo.getVersion(),
    "DEVICE_LOCATION": DeviceInfo.getDeviceLocale(),
    "DEVICE_COUNTRY":  DeviceInfo.getDeviceCountry(),
    "PARAM":"visitor_id="+encodeURIComponent(DeviceInfo.getUniqueID())+
            "&agent="+encodeURIComponent(DeviceInfo.getManufacturer()+" "+DeviceInfo.getModel()+" "+DeviceInfo.getSystemVersion())+
            "&app_ver="+encodeURIComponent(DeviceInfo.getVersion())
};

function setupChannel() {
  if(channel) return;

  getAppSettings().then(appSettings => {
    if(!/channel/.test(BASE_INFO.PARAM)) {
      channel = true;
      BASE_INFO.PARAM += `&channel=` + appSettings.channel 
    }
  });
}


class Tracker {
    workable = true;

    constructor() {
    	this.brgUmeng = NativeModules.StatisticalEvent;
    }

    composeBasicParams(key) {
        return TRACKER_CONFIG.BASIC_URL+"/g/"+TRACKER_CONFIG.APP+"/"+key+"/"+"?"+BASE_INFO.PARAM;
    }

    triggerTracking(config) {
        setupChannel();

        var urlPrefix = this.composeBasicParams(config.key);
        var url = urlPrefix+"&user="+this.user_id;

        for(let key in config) {
          url += `&${key}=${encodeURIComponent(config[key])}`
        }

        console.log('tracking: ' + url);
        fetch(url).then(response => {
            return;
        });

        let { key, topic, entity, event} = config;
	      // add in umeng tracker
      	this.brgUmeng.onEvent(key+"_"+topic+"_"+entity+"_"+event);
	return;
    }

    trackAction(config) {
        if (!this.workable) return;

        this.triggerTracking(config);
    }

    trackPage(key, entity, topic) {
        if (!this.workable)
            return;
        var event = "landing";
        this.triggerTracking({key, entity, topic, event });
    }
}

var tracker =  new Tracker();
export default tracker;

