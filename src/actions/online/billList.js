import { AsyncStorage } from 'react-native';
import { get, mock, responseStatus } from 'utils/fetch';

export default function(body, getState) {
  var { type, status, ticket_id, login_target, loan_type } = body || {}, url;

  type = type || "bank_wap";
  loan_type = loan_type || 0;
  url = `/bill/bill-list?type=${type}&loan_type=${loan_type}`;
  status && (url += `&status=${status}`);
  ticket_id && (url += `&ticket_id=${ticket_id}`);
  login_target && (url += `&login_target=${login_target}`);

  if(loan_type == 4) return mock(`/bill/bill-list?type=${type}&loan_type=${loan_type}`);
  return get(url);
}
