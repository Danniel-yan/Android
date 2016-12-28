import { get, responseStatus } from 'utils/fetch';

export default function() {

  return (dispatch, getState) => {

    dispatch({type: 'requestPreloanStatus'});

    get('/loanctcf/check-preloan').then(response => {

      //response = { res: 1, data: {
      //  "status": 0, //0=初筛通过，可以申请预授信，1=预授信申请已通过，2=预授信申请已经提交，3=预授信申请被拒绝，4=申请流程已过期，5=当前无法提交预授信申请，6=网银账单已过期，7=网银账单尚未通过审核，8=运营商账单已过期，9=运营商账单尚未通过审核
      //  "msg": "您的预授信申请已通过", //对应status的信息
      //  "data": {
      //      "card_no_last_four_list": [ //允许上传的信用卡尾号列表
      //        "1234",
      //        "6789"
      //      ],
      //      "time_expire":"2016-12-29 13:10:58", //过期时间
      //      "sug_loan_amount": "50000", //额度
      //      "sug_term": "24",  //期限
      //      "interest_down": "1.5%", //费率上限
      //      "interest_up": "1.7%", //费率下限
      //  }
      //}
      //}

      if(response.res == responseStatus.success) {
        dispatch({type: 'receivePreloanStatus', status: response.data})
      }

    })
  }

}
