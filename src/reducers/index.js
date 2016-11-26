import { combineReducers } from 'redux';

import navigation from './navigation';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import homeCardList from './scene/home/cardList';
import { filterList } from './scene/fast/filterList';
import fastLoanRecommendList from './scene/fastLoanRecommendList';
import loanDetail from './scene/loanDetail';
import actHot from './scene/card/actHot';
import bankList from './scene/card/bankList';
import fillUserInfo from  './fillUserInfo';
import userInfo from './scene/userInfo';
import shopNearby from './scene/card/shopNearby'
import homeOperating from './scene/home/operating';
import actHotDetail from './scene/card/actHotDetail';

export default combineReducers({
  navigation,
  homeRecommendList,
  filterList,
  homeLoanList,
  homeCardList,
  fastLoanRecommendList,
  loanDetail,
  actHot,
  bankList,
  fillUserInfo,
  userInfo,
  shopNearby,
  homeOperating,
  actHotDetail
});
