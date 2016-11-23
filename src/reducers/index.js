import { combineReducers } from 'redux';

import navigation from './navigation';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import homeCardList from './scene/home/cardList';
import fastLoanRecommendList from './scene/fastLoanRecommendList';
import loanDetail from './scene/loanDetail';
import actHot from './scene/actHot';
import bankList from './scene/bankList';
import fillUserInfo from  './scene/fillUserInfo';
import shopNearby from './scene/shopNearby'
import homeOperating from './scene/home/operating';

export default combineReducers({
  navigation,
  homeRecommendList,
  homeLoanList,
  homeCardList,
  fastLoanRecommendList,
  loanDetail,
  actHot,
  bankList,
  fillUserInfo,
  shopNearby,
  homeOperating
});
