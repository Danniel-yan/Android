import { combineReducers } from 'redux';

import navigation from './navigation';
import bannerImgList from './scene/home/bannerImgList';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import homeCardList from './scene/home/cardList';

export default combineReducers({
  navigation,
  bannerImgList,
  homeRecommendList,
  homeLoanList,
  homeCardList
});
