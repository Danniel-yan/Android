import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { majorPush, majorPop, externalPush, externalPop, majorTab } from 'actions/navigation';

import fetchUser from 'actions/loginUser';

import { setLoanInfo } from 'actions/scene/fast/filterList';
import submitUserInfo from 'actions/fillUserInfo';

import RecLoanScene from 'components/scene/RecLoanScene';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';
import { trackingScene } from 'high-order/trackingPointGenerator';

function mapStateToProps(state) {
  return {
    isFetching: state.loginUser.isFetching || state.loginUser.logouting,
    fetched: state.loginUser.fetched,
    userInfo: state.loginUser.info,
    loanInfo: { amount: state.filterList.amount, period: state.filterList.period },
    submitting: state.fillUserInfo.submitting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      AsyncStorage.getItem('userToken').then(token=> {
        if(!token) return;
        dispatch(fetchUser());
      });
    },
    setLoanInfo: (loanInfo) => { dispatch(setLoanInfo(loanInfo)); },
    goLoan: body => {
      dispatch(submitUserInfo(body, () => {
        dispatch(externalPush({key:"LoanScene", title:"推荐贷款"}));
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(RecLoanScene)));
