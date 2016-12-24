import { combineReducers } from 'redux';
import banks from './banks';
import bankDetail from './bankDetail';
import submitCreditCard from './submitCreditCard';

export default combineReducers({
  banks,
  bankDetail,
  submitCreditCard,
})
