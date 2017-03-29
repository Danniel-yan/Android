import { connect } from 'react-redux';

import findHome from 'components/find/findHome';
import { trackingScene } from 'high-order/trackingPointGenerator';
import pboc from 'actions/pboc';
import { externalPush } from 'actions/navigation';
import { CertificationEntry } from 'high-order/Certification';
import { FreeStatus, BlackListReports, CardList, CreateBlackListTicket, InitalBlackListTarget } from 'actions/blackList';
import navToBlackList from 'actions/blackList/navToBlackList';

function mapStateToProps(state) {
  var logined = state.loginUser.info;
  return {
    fetching: logined ? (state.blackListData.isFetchingFree || state.blackListData.isFetchingReports) : false,
    fetched: logined ? (state.blackListData.freeFetched || state.blackListData.reportFetched) : true,
    blackListStateFetched: state.blackListData.freeFetched && state.blackListData.reportFetched,
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
    },
    fetchingBLState: () => {
      dispatch(FreeStatus());
      dispatch(BlackListReports());
    },
    pboc: params => dispatch(pboc(params)),
    externalPush: route => dispatch(externalPush(route)),
    setLoanType: () => dispatch({ type: "SetLoanType", value: 0 }),
    navToBackList: () => dispatch(navToBlackList())
  }
}

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import Loading from 'components/shared/Loading';

export default CertificationEntry(connect(mapStateToProps,mapDispatchToProps)(AsynCpGenerator(Loading, trackingScene(findHome))));
