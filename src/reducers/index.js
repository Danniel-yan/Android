import { combineReducers } from 'redux';

import navigation from './navigation';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import categoryList from './scene/home/categoryList';
import { filterList } from './scene/fast/filterList';
import fastLoanRecommendList from './scene/fastLoanRecommendList';
import loanDetail from './scene/loanDetail';
import actHot from './scene/card/actHot';
import bankList from './scene/card/bankList';
import fillUserInfo from './fillUserInfo';
import userInfo from './scene/userInfo';
import shopNearby from './scene/card/shopNearby'
import homeOperating from './scene/home/operating';
import actHotDetail from './scene/card/actHotDetail';
import messages from './scene/messages';
import cardList from './scene/card/cardList'
import loginUser from './loginUser';

export default combineReducers({
  loginUser,
  navigation,
  homeRecommendList,
  filterList,
  homeLoanList,
  categoryList,
  fastLoanRecommendList,
  loanDetail,
  actHot,
  bankList,
  fillUserInfo,
  userInfo,
  shopNearby,
  homeOperating,
  actHotDetail,
  messages,
  cardList
});
