import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { majorPush, majorPop, externalPush, externalPop, majorTab } from 'actions/navigation';
import { fetchUserInfo, userInfoUpdated } from 'actions/scene/userInfo';
import { setLoanInfo } from 'actions/scene/fast/filterList';
import submitUserInfo from 'actions/fillUserInfo';

import RecLoanScene from 'components/scene/RecLoanScene';
import AsynCpGenerator from 'components/high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

function mapStateToProps(state) {
  return {
    isFetching: state.userInfo.isFetching,
    fetched: state.userInfo.fetched,
    userInfo: state.userInfo.userInfo,
    loanInfo: { amount: state.filterList.amount, period: state.filterList.period }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => { dispatch(fetchUserInfo()) },
    setLoanInfo: (loanInfo) => { dispatch(setLoanInfo(loanInfo)); },
    goLoan: (params) => {
      dispatch(submitUserInfo(params, () => {
        dispatch(externalPush({key:"LoanScene"}));
      }))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, RecLoanScene));
