const applyFree = false;
const withoutCardBind = true;

export const mockData = {
  '/blaclist/check-free': {
    "res": 1,
    "data": {
        "result": applyFree ? 0 : 1 //1=免费查询过，0=未免费查询过
    }
  },
  '/blaclist/check-list': {
    "res": 1,
    "data": [
        {
            "realname": "李冬二", //姓名
            "id_num": "320681199001167011", //身份证号码
            "mobile": "13890029233",  //手机号码
            "time_update": "2017-02-15 11:13:13" //查询时间
        },
        {
            "realname": "李冬三",
            "id_num": "320681199001167011",
            "mobile": "13890029233",
            "time_update": "2017-02-15 10:27:37"
        }
    ]
  },

  '/blaclist/create': {
    "res": 1,
    "data": {
        "ticket_id": "abcded-dfsdf", // 101支付情况下存在,支付id，供后续支付流程使用
        "result": !applyFree ? null : { resultData: "data" }, // 201支付情况下存在，结构未定
    }
  },
  "/payctcf/cardlist": {
    "res": 1,
    "data": withoutCardBind ? [] : [
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
    "res": 1, // 1: "SUCCESS", 0: "FAILED"
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
  },
  "/payctcf/confirm": {
    "res": 1, // 1: "SUCCESS", 0: "FAILED"
    "data": []
  },
  "/payorder/check-status": {
    "res": 1,
    "data": {
        "status": 2, //支付结果，1=支付中，2=支付成功，3=支付失败
        "blacklist_result": 1 //status=2时，并且订单是黑名单查询订单时，有此字段，0=待查询，1=命中黑名单，2=未命中黑名单
    }
  }
}
