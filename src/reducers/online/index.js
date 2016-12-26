import { combineReducers } from 'redux';
import banks from './banks';
import bankDetail from './bankDetail';
import submitCreditCard from './submitCreditCard';
import userInfo from './userInfo';
import pickers from './pickers';
import bankResult from './bankResult';
import yysResult from './yysResult';

export default combineReducers({
  banks,
  bankDetail,
  submitCreditCard,
  userInfo,
  pickers,
  bankResult,
  yysResult
})
