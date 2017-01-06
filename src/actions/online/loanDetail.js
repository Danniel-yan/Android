import { get, responseStatus } from 'utils/fetch';

export default function(dispatch) {

  return (dispatch, getState) => {

    dispatch({ type: 'requestOnlineLoanDetail' })

    get('/loanctcf/contract-content').then(response => {
      // TODO remove
      //      response = 
      //{
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
      //}

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineLoanDetail', detail: response.data })
      }
    })

  }

}
