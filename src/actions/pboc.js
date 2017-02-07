import { externalPush } from 'actions/navigation';
import { AsyncStorage } from 'react-native';

export default function navToPBOC(params) {
  return dispatch => {
    var token = null;
    AsyncStorage.getItem('userToken').then(userToken => {
      token = userToken || null;
      return AsyncStorage.getItem("environment");
    }).then(env => {
      var pbocUrl = 'https://sysapp.jujinpan.cn/static/pages/pboc/index.html?app=chaoshi';
      webUrl = env=="production" ? pbocUrl + "&debug=0" : pbocUrl + "&debug=1";
      webUrl = webUrl + "&token=" + token;

      dispatch(externalPush({web: webUrl, title: "央行征信"}));
    });
  };

}
