
import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import  Loading  from 'components/shared/Loading';

//import { fetchCategory } from 'actions/find/loanProduct';
import loanProduct from 'components/find/loanProduct';
import fetchFindOperating from 'actions/find/operating'

function mapStateToProps(state) {
  return {
    isFetching: state.findOperating.isFetching,
    fetched: state.findOperating.fetched,
    loanProductList : state.findOperating.operating.index_loanlist,
    isIOSVerifying: state.iosConfig.isIOSVerifying,
    iosFetched: state.iosConfig.fetched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsynCpGenerator(Loading, loanProduct));
