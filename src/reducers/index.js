import { combineReducers } from 'redux';

import navigation from './navigation';
import { indexConfig } from './scene/home/indexConfig';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import homeCardList from './scene/home/cardList';
import fastLoanRecommendList from './scene/fastLoanRecommendList';
import loanDetail from './scene/loanDetail';
import actHot from './scene/actHot';
import bankList from './scene/bankList';
import fillUserInfo from  './scene/fillUserInfo';
import shopNearby from './scene/shopNearby'

export default combineReducers({
  navigation,
  indexConfig,
  homeRecommendList,
  homeLoanList,
  homeCardList,
  fastLoanRecommendList,
  loanDetail,
  actHot,
  bankList,
  fillUserInfo,
  shopNearby
});
