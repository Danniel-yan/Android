import { connect } from 'react-redux';

import creditReport from 'components/find/creditReport';
import { trackingScene } from 'high-order/trackingPointGenerator';
import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

import fetchBlackListDetail from 'actions/find/detail'

function mapStateToProps(state, ownProps) {
  // var result = ownProps.result;
  return {
    result: ownProps.result,
    isFetching: state.blackListDetail.isFetching,
    fetched: state.blackListDetail.fetched,
    creditScore: state.online.userInfo.creditScore,
    percenter: ownProps.result == 1 ? state.blackListDetail.operating.percent_fail : state.blackListDetail.operating.percent_success,
    success_loanlist: state.blackListDetail.operating.success_loanlist,
    fail_loanlist: state.blackListDetail.operating.fail_loanlist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(fetchBlackListDetail())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(creditReport)));
