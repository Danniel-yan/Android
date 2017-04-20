import { connect } from 'react-redux';

import AsynCpGenerator from 'high-order/AsynCpGenerator';
import RecommendList from 'components/shared/RecommendList.js';
import Loading from 'components/shared/Loading';
import { loanType } from 'constants';
import { externalPush } from 'actions/navigation';

function filterRecommendList(recommends, logined) {
  var list = [];
  recommends && recommends.map(item => {
    if(item.loan_type == loanType.suixinjie) {
      list.push(Object.assign({}, item, {
        toKey: logined ? "SuiXinJieList" : "Login",
        nextKey: logined ? null : "SuiXinJieList"
      }));
    } else {
      list.push(item);
    }
  })
  return list;
}

function mapStateToRecResultProps(state) {
  return {
    isFetching: state.filterList.isFetching,
    fetched: state.filterList.fetched,
    recommends: filterRecommendList([...state.filterList.result_list, ...state.filterList.more_list], state.loginUser.info),
    isIOS: state.iosConfig.isIOS,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // majorPush: route => dispatch(majorPush(route)),
    // majorPop: route => dispatch(majorPop(route)),
    //
    // fetchingList: params => dispatch(fetchingFastFilterList(params))
    fetching: () => {},
    externalPush: route => dispatch(externalPush(route))
  };
}

export const RecList = connect(mapStateToRecResultProps, mapDispatchToProps)(AsynCpGenerator(Loading, RecommendList));
