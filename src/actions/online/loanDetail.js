import { get, post, responseStatus } from 'utils/fetch';
import actions from 'actions/online';
import { loanType } from 'constants';

export default function(dispatch) {

  return (dispatch, getState) => {

    var state = getState(), loan_type = parseInt(state.online.loanType.type) || 0;
    if (loan_type == loanType.chaohaodai) {
      // dispatch(actions.bankInfo())
      dispatch(actions.repayAmount())
    }

    dispatch({ type: 'requestOnlineLoanDetail' })

    post(`/loanctcf/contract-content`, {loan_type}).then(response => {
      // TODO remove
      //      response =
      // {
      //    "res": 1,
      //    "data": {
      //        "applyAmount": 10000, //贷款金额
      //        "totalLoanRepaymentTerms": 24, //贷款期限
      //        "interestRate": 0.088, //贷款利率
      //        "repayPlanResults": [ //还款计划
      //            {
      //                "phases": 0, //服务费
      //                "repayAmount": 655.14, //服务费金额
      //                "repayDate": "2016-12-30 18:14:50" //还款日期
      //            },
      //            {
      //                "phases": 1, //第一期
      //                "repayAmount": 487.85, //还款金额
      //                "repayDate": "2017-02-10 00:00:00" //还款日期
      //            },
      //            {
      //                "phases": 24,
      //                "repayAmount": 487.71,
      //                "repayDate": "2019-01-10 00:00:00"
      //            }
      //        ]
      //    }
      // }

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineLoanDetail', detail: response.data })
      }
    })

  }

}
