import { combineReducers } from 'redux';

import navigation from './navigation';
import homeRecommendList from './scene/home/recommendList';

export default combineReducers({
  navigation,
  homeRecommendList
});
