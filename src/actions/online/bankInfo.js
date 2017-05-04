import { get, post, responseStatus } from 'utils/fetch';

export default function(dispatch) {

  return (dispatch, getState) => {
    var state = getState(), loan_type = parseInt(state.online.loanType.type) || 0;

    dispatch({ type: 'requestOnlineBankInfo' })

    return post(`/loanctcf/contract-bank-info`, {loan_type}).then(response => {
      //todo remove
      response = {
        "res": 1,
        "data": {
          "id_no": "430703198808061234", //身份证号码
          "name": "店小二", //姓名
          "mobile": "18620571234", //手机号码
          "bank_card_no": "6214831214721234", //银行卡号
          "bank_name": "招商银行", //银行名称
          "logo": { //银行图标
            "small": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/small/6.png",
            "index": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/index/6.png",
            "white": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/white/6.png",
            "px80": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/6.png"
          }
        }
      }
      if(response.res == responseStatus.success) {
        dispatch({ type: 'receiveOnlineBankInfo', detail: response.data })
      }
    })

  }

}
