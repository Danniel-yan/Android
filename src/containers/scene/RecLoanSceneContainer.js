import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { majorPush, majorPop, externalPush, externalPop, majorTab } from 'actions/navigation';
import { fetchUserInfo, goLoan } from 'actions/scene/userInfo';
import { setLoanInfo } from 'actions/scene/fast/filterList';

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
    fetching: () => { console.log("*****Fetching*****"); dispatch(fetchUserInfo()) },
    setLoanInfo: (loanInfo) => { dispatch(setLoanInfo(loanInfo)); },
    goLoan: (params) => { dispatch(goLoan(params)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, RecLoanScene));
