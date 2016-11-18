import { combineReducers } from 'redux';

import navigation from './navigation';
import recommendList from './scene/home/recommendList';

export default combineReducers({
  navigation,
  recommendList
});
