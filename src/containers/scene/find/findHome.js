import { connect } from 'react-redux';

import findHome from 'components/find/findHome';
import { trackingScene } from 'high-order/trackingPointGenerator';
import { FreeStatus, BlackListReports, CardList, CreateBlackListTicket, InitalBlackListTarget } from 'actions/blackList';

function mapStateToProps(state) {
  return {
    isFetching: state.blackListData.isFetchingReports || state.blackListData.isFetchingFree,
    free: state.blackListData.free,
    hasChance: state.blackListData.hasChance,
    hasReport: state.blackListData.reports && state.blackListData.reports.length > 0,
    loginUser: state.loginUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: () => {
      dispatch(FreeStatus());
      dispatch(BlackListReports());
    }
  };
}

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

export default connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(findHome)));
