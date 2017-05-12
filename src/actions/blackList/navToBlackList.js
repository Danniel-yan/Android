import { get } from 'utils/fetch';
import { externalPush } from 'actions/navigation';
import { FreeStatus, BlackListReports } from 'actions/blackList';

export default function navToBlackList(success) {
  return (dispatch, getState) => {
    var state = getState(), bLData = state.blackListData, isLogin = state.loginUser.info != null;

    if(!isLogin && !success) {
      dispatch(externalPush({ key: "Login", title: "登录", componentProps: { loginSuccess: () => {
        dispatch(navToBlackList(true))
      } } }));
    } else {
      var fetched = bLData.freeFetched && bLData.reportFetched;
      var navToList = !bLData.free && !bLData.hasChance && bLData.reports && bLData.reports.length > 0;

      if(fetched) return dispatch(externalPush({
        key: navToList ? "BlackListReports" : "BlackListhome",
        title: navToList ? "已有报告" : "网贷信用查询"
      }));
      if(!bLData.freeFetched && !bLData.reportFetched) return Promise.all([dispatch(FreeStatus()), dispatch(BlackListReports())]).then(() => dispatch(navToBlackList()));
      if(!bLData.freeFetched) return dispatch(FreeStatus()).then(() => dispatch(navToBlackList()));
      if(!bLData.reportFetched) return dispatch(BlackListReports()).then(() => dispatch(navToBlackList()));
    }
  };


}
