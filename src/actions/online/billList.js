import { AsyncStorage } from 'react-native';
import { get, responseStatus } from 'utils/fetch';

export default function(body) {

  // bank_id && (url += `&bank_id=${bank_id}`);

  return AsyncStorage.getItem("loan_type").then(loan_type => {
    var { type, status, ticket_id, login_target } = body || {}, url;
    type = type || "bank_wap";
    loan_type = body.loan_type || loan_type || 0;
    url = `/bill/bill-list?type=${type}&loan_type=${loan_type}`;
    status && (url += `&status=${status}`);
    ticket_id && (url += `&ticket_id=${ticket_id}`);
    login_target && (url += `&login_target=${login_target}`);

    return get(url);
  });

}
