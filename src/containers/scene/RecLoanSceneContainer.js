import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { majorPush, majorPop, externalPush, externalPop } from 'actions/navigation';
import fetchUserInfo from 'actions/scene/userInfo';

import RecLoanScene from 'components/scene/RecLoanScene';
import externalScene from 'components/high-order/externalScene';
import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return state.userInfo;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => { dispatch(fetchUserInfo()) },

    updateInfo: (params) => {  },
    goLoan: () => {
      AsyncStorage.getItem('userToken').then(token => {
        if(token == null) {
          dispatch(externalPush({ key: 'Login' }))
        } else {
          dispatch(externalPush({ key: "FastLoanScene" }))
        }
      })
    },
    externalPush: (route) => { dispatch(externalPush(route)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, externalScene(RecLoanScene)));
