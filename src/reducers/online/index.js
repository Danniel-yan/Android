import { combineReducers } from 'redux';
import banks from './banks';
import bankDetail from './bankDetail';
import submitCreditCard from './submitCreditCard';
import userInfo from './userInfo';
import pickers from './pickers';

export default combineReducers({
  banks,
  bankDetail,
  submitCreditCard,
  userInfo,
  pickers
})
