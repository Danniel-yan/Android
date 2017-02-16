export const mockData = {


  '/blaclist/create': {
    "res": 1,
    "data": {
        "ticket_id": "abcded-dfsdf", // 101支付情况下存在,支付id，供后续支付流程使用
        "result": {}, // 201支付情况下存在，结构未定
    }
  },
  "/payctcf/cardlist": {
    "res": 1,
    "data": [
        {
            "id": 1, //bindcard_id,/payctcf/create接口中需要
            "name": "徐飞", //姓名
            "bankAccount": "1681", //卡号后4位
            "bank_id": 6,
            "bankname": "招商银行", //银行名称
            "logo": {
                "small": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/small/6.png",
                "index": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/index/6.png",
                "white": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/white/6.png",
                "px80": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/6.png"
            }
        },
        {
            "id": 2, //bindcard_id,/payctcf/create接口中需要
            "name": "王睆", //姓名
            "bankAccount": "1681", //卡号后4位
            "bank_id": 6,
            "bankname": "招商银行", //银行名称
            "logo": {
                "small": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/small/6.png",
                "index": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/index/6.png",
                "white": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/white/6.png",
                "px80": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/6.png"
            }
        }
    ]
  },
  "/payctcf/create": {
    "res": 1,
    "data": []
  },
  "/payctcf/check-card": {
    "res": 1,
    "data": {
        "bankname": "光大银行", //银行名称
        "cardtype": "DEBIT", //DEBIT:储蓄卡，CREDIT：信用卡，
        "cardnum": "3037751111231231", //卡号
        "logo": {
            "small": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/small/9.png",
            "index": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/index/9.png",
            "white": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/white/9.png",
            "px80": "http://sys-php.img-cn-shanghai.aliyuncs.com/bank_icon/px80/9.png"
        },
        "key": 9
    }
  }
}
