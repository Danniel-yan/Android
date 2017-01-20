import { get, post, responseStatus } from 'utils/fetch';

export default function() {
  return (dispatch, getState) => {
    dispatch({ type: 'requestOnlineApproveResult' })
    var state = getState(), loanType = state.online.loanType.type || 0;
    post('/loanctcf/apply-result', { loan_type: parseInt(loanType) }).then(response => {
      // TODO remove
      //      response =
      //{
      //    "res": 1,
      //    "data": {
      //        "applydata": { //审核提交信息
      //            "id_card_head_photo_uri": "http://sys-php.img-cn-shanghai.aliyuncs.com/chaoshi/t/8/42759f9587de572b8ed37ba73c1903fe.jpg", //身份证正面照片
      //            "id_card_tail_photo_uri": "http://sys-php.img-cn-shanghai.aliyuncs.com/chaoshi/t/8/d4b4cf961f83c6f36f84dc10cac45699.jpg", //身份证反面照片
      //            "credit_card_photo_uri": "http://sys-php.img-cn-shanghai.aliyuncs.com/chaoshi/t/8/3f2bed1f6e907a244b3dbf822af6ed3a.jpg", //信用卡正面照片
      //            "apply_amount": "10000", //申请金额
      //            "credit_card_no": "6259570000893864", //绑定页银行卡卡号
      //            "credit_card_mobile": "18621318729", //银行卡绑定手机号码
      //            "face_result": "310115198104121915" //身份证号码
      //        },
      //        "resultdata": { //审核结果信息，如果审核未通过，则为空对象
      //            "month_fee": "1.7", //月费率
      //            "sug_term": 24, //分期期限
      //            "approve_valid_date": "2017-01-25 00:00:00", //审批结果有效期
      //            "approve_amount": "30000", //审批金额
      //            "repayPlanResults": [ //还款计划表
      //                {
      //                    "phases": 0, //0期：服务费
      //                    "repayAmount": 655.14, //服务费金额
      //                    "repayDate": "2016-12-30 18:14:50" //付款日期
      //                },
      //                {
      //                    "phases": 1, //第1期
      //                    "repayAmount": 487.85, //还款金额
      //                    "repayDate": "2017-02-10 00:00:00" //还款日
      //                },
      //                {
      //                    "phases": 2, //第1期
      //                    "repayAmount": 487.85, //还款金额
      //                    "repayDate": "2017-02-10 00:00:00" //还款日
      //                },
      //                {
      //                    "phases": 24,
      //                    "repayAmount": 487.71,
      //                    "repayDate": "2019-01-10 00:00:00"
      //                }
      //            ]
      //        }
      //    }
      //}

      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineApproveResult', result: response.data })
      }

    }).catch(console.log)

  }
}
