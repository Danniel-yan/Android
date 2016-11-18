
import { connect } from 'react-redux';

import { fetchHomeLoans } from 'actions/scene/home/loanList';
import LoanList from 'components/shared/LoanList'

function mapStateToProps(state) {
  return state.homeLoanList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLoans: () => dispatch(fetchHomeLoans())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanList);
