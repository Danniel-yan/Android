import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { majorPush, majorPop, externalPush, externalPop } from 'actions/navigation';
import { fetchUserInfo, goLoan } from 'actions/scene/userInfo';

import RecLoanScene from 'components/scene/RecLoanScene';
import externalScene from 'components/high-order/externalScene';
import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    fillUserInfoResponse: state.fillUserInfo.response
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => { dispatch(fetchUserInfo()) },
    goLoan: (params) => { dispatch(goLoan(params)) },
    fillUserInfoSuccess: (response) => {
      var res = response.res;
      res === 1 && dispatch(externalPush({key: "FastLoanScene"}));
    },
    externalPush: (route) => { dispatch(externalPush(route)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, externalScene(RecLoanScene)));
