import { connect } from 'react-redux';

import { fetchHomeRecommends } from 'actions/scene/home/recommendList';
import RecommendListPanel from 'components/scene/home/RecommendListPanel';
import { externalPush } from 'actions/navigation';
import { loanType } from 'constants';

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


function mapStateToProps(state) {
  return {
    ...state.homeRecommendList,
    recommends: filterRecommendList(state.homeRecommendList.recommends, state.loginUser.info),
    isIOSVerifying: state.iosConfig.isIOSVerifying,
    isIOS: state.iosConfig.isIOS,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetching: params => dispatch(fetchHomeRecommends(params)),
    externalPush: (params) => dispatch(externalPush(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendListPanel);
