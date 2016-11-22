import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import FillUserInfo from 'components/scene/FillUserInfo';
import { externalPop, externalPush } from 'actions/navigation';
import submitUserInfo from 'actions/scene/fillUserInfo';
import externalScene from 'components/high-order/externalScene';


function mapStateToProps(state) {
  return state.fillUserInfo
}

function mapDispatchToProps(dispatch) {
  return {
    submit: body => dispatch(submitUserInfo(body)),
    submitSuccess: response => {
      //dispatch(externalPop())
      AsyncStorage.setItem('userToken', 'hahah').then(() => {
        dispatch(externalPush({key: 'sdf',web: 'https://baidu.com'}));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(externalScene(FillUserInfo))
