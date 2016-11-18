import { combineReducers } from 'redux';

import navigation from './navigation';
import homeRecommendList from './scene/home/recommendList';
import homeLoanList from './scene/home/loanList';
import homeCardList from './scene/home/cardList';

export default combineReducers({
  navigation,
  homeRecommendList,
  homeLoanList,
  homeCardList
});
