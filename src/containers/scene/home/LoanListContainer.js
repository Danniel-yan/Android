
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

import { fetchHomeLoans } from 'actions/scene/home/loanList';
import LoanList from 'components/shared/LoanList'

function mapStateToProps(state) {
  return state.homeLoanList;
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => dispatch(fetchHomeLoans())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, LoanList));
