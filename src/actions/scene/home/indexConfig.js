import { get } from 'utils/fetch';

function requestFetch() {
  return {
    type: 'fetchingIndexConfig'
  };
}

//首页顶部banner列表
function receiveIndexTopBanner(list) {
  return {
    type: 'receiveIndexTopBanner',
    list: list
  };
}

//首页滚动小广告
function receiveLoanAdInfo(list) {
  return {
    type: 'receiveLoanAdInfo',
    list: list
  }
}

export function fetchIndexConfig() {
  return function(dispatch) {
    dispatch(requestFetch());

    return get("/app/index-config", {})
      .then(json => {
        var data = json.data;
        data.index_loan_adinfo && dispatch(receiveLoanAdInfo(data.index_loan_adinfo));
        data.index_top_banner && dispatch(receiveIndexTopBanner(data.index_top_banner));
      })
  };
}
