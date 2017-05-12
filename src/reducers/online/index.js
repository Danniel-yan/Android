import { combineReducers } from 'redux';
import status from './status';
import banks from './banks';
import bankDetail from './bankDetail';
import bankInfo from './bankInfo';
import repayAmount from './repayAmount';
import repayDetail from './repayDetail';
import submitCreditCard from './submitCreditCard';
import userInfo from './userInfo';
import pickers from './pickers';
import bankResult from './bankResult';
import yysResult from './yysResult';
import yysForms from './yysForms';
import preloanStatus from './preloanStatus';
import preloan from './preloan';
import applyResult from './applyResult';
import contractBanks from './contractBanks';
import loanDetail from './loanDetail';
import loanType from './loanType';
import gjjResult from './gjjResult';
import gjjDetail from './gjjDetail';
import gjjLoginElements from './gjjLoginElements';
import userCreditDetail from './userCreditDetail';
import userCreditLevel from './userCreditLevel';
import userCreditConfig from './userCreditConfig';
import pboc from './pboc';
import suixinjie from './suixinjie';
import { applyStatus, activeResult } from './chaoHaoDai';

export default combineReducers({
  loanDetail,
  contractBanks,
  status,
  applyResult,
  preloanStatus,
  preloan,
  banks,
  bankDetail,
  bankInfo,
  repayAmount,
  repayDetail,
  submitCreditCard,
  userInfo,
  pickers,
  bankResult,
  yysResult,
  yysForms,
  loanType,
  gjjResult,
  gjjLoginElements,
  gjjDetail,
  userCreditDetail,
  userCreditLevel,
  userCreditConfig,
  pboc,
  suixinjie,
  chaoHaoDai: combineReducers({ applyStatus, activeResult })
})
