import DeviceInfo from 'react-native-device-info';
import { AsyncStorage } from 'react-native';
import { NativeModules } from 'react-native';

const TRACKER_CONFIG = {
    "BASIC_URL":"https://mdt.jujinpan.cn",
    "APP":"chaoshi"
};

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

class Tracker {
    workable = true;

    constructor() {
    	this.brgUmeng = NativeModules.StatisticalEvent;
   	console.log(this.brgUmeng); 
    }

    composeBasicParams(key) {
        return TRACKER_CONFIG.BASIC_URL+"/g/"+TRACKER_CONFIG.APP+"/"+key+"/"+"?"+BASE_INFO.PARAM;
    }

    triggerTracking(key, entity, topic, event) {
        var urlPrefix = this.composeBasicParams(key);
        var url = urlPrefix+"&entity="+entity+"&topic="+topic+"&event="+event+"&user="+this.user_id;
        fetch(url).then(response => {
            return;
        });
	// add in umeng tracker
	this.brgUmeng.onEvent(key+"_"+topic+"_"+entity+"_"+event);
	return;
    }

    trackGeneral(key, entity, topic, event) {
        if (this.user_id != "") {
            AsyncStorage.getItem('userToken').then(token => {
                Tracker.user_id = token;
                this.triggerTracking(key, entity, topic, event);
            });
        } else  {
            this.triggerTracking(key, entity, topic, event);
        }
    }

    trackAction(key, entity, topic, event) {
        if (!this.workable)
            return;
        this.trackGeneral(key, entity, topic, event);
    }

    trackPage(key, entity, topic) {
        if (!this.workable)
            return;
        var event = "landing";
        this.trackGeneral(key, entity, topic, event);
    }
}

var tracker =  new Tracker();
export default tracker;

