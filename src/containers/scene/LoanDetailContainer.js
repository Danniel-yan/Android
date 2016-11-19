
import { connect } from 'react-redux';

import AsynCpGenerator from 'components/high-order/AsynCpGenerator';

import { fetchLoanDetail } from 'actions/scene/loanDetail';
import LoanDetail from 'components/scene/LoanDetailScene'

function mapStateToProps(state) {
  return state.loanDetail;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchLoanDetail())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(null, LoanDetail));
