import { connect } from 'react-redux';

import creditReport from 'components/find/creditReport';
import { trackingScene } from 'high-order/trackingPointGenerator';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import recLoanOperating from 'actions/find/recLoan'

function mapStateToProps(state) {
  return {
    creditScore: state.online.userInfo.creditScore,
    percenter : state.recLoan.operating.percent,
    success_loanlist: state.recLoan.operating.success_loanlist,
    fail_loanlist: state.recLoan.operating.fail_loanlist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(recLoanOperating())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(creditReport)));
