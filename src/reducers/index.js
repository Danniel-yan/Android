import { combineReducers } from 'redux';

import navigation from './navigation';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import categoryList from './scene/home/categoryList';
import { filterList } from './scene/fast/filterList';
import loanDetail from './scene/loanDetail';
import actHot from './scene/card/actHot';
import bankList from './scene/card/bankList';
import fillUserInfo from './fillUserInfo';
import shopNearby from './scene/card/shopNearby'
import homeOperating from './scene/home/operating';
import actHotDetail from './scene/card/actHotDetail';
import messages from './scene/messages';
import cardList from './scene/card/cardList'
import loginUser from './loginUser';
import actDetailBanner from './scene/card/actDetailBanner';
import repayCalc from './scene/repayCalc';
import iosConfig from './iosConfig';
import cardConfig from './scene/card/cardConfig';
import cardArtical from './cardArtical';

import online from './online';
import findOperating from './find/operating';
//import findLoanProduct from './find/loanProduct';
import articalList from './find/artical';

export default combineReducers({
  loginUser,
  cardConfig,
  navigation,
  homeRecommendList,
  filterList,
  homeLoanList,
  categoryList,
  loanDetail,
  actHot,
  bankList,
  fillUserInfo,
  cardArtical,
  shopNearby,
  homeOperating,
  actHotDetail,
  messages,
  cardList,
  actDetailBanner,
  repayCalc,
  online,
  iosConfig,
  findOperating,
  articalList,
  //findLoanProduct,
});
