import { combineReducers } from 'redux';

import navigation from './navigation';
import {bannerImgList, broadcastList} from './scene/home/headerSection';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import homeCardList from './scene/home/cardList';
import fastLoanRecommendList from './scene/fastLoanRecommendList';
import loanDetail from './scene/loanDetail';

export default combineReducers({
  navigation,
  bannerImgList,
  broadcastList,
  homeRecommendList,
  homeLoanList,
  homeCardList,
  fastLoanRecommendList,
  loanDetail
});
