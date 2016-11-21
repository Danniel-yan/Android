import {
  AlertIOS,
  ToastAndroid,
  Platform
} from 'react-native';


export default function alert(content, title = '') {
  if(Platform.OS == 'ios') {
    AlertIOS.alert(content, title);
  } else {
    ToastAndroid.show(content, ToastAndroid.SHORT);
  }
} 
