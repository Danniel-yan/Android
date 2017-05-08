const applyFree = true;
const withoutCardBind = true;

export const mockData = {
  '/blacklist/check-free': {
    "res": 1,
    "data": {
        "result": applyFree ? 0 : 1, //1=免费查询过，0=未免费查询过
        "checkmore": 1,
        "free": !applyFree ? 0 : 1,
    }
  },
  '/blacklist/check-list': {
    "res": 1,
    "data": [
        {
            "realname": "李冬二", //姓名
            "id_num": "320681199001167011", //身份证号码
            "mobile": "13890029233",  //手机号码
            "result": 2,  //1=命中黑名单，2=未命中
            "time_update": "2017-02-15 11:13:13" //查询时间
        }
    ]
  },

  '/blacklist/create': {
    "res": 1,
    "data": {
        //"ticket_id": "abcded-dfsdf", // 101支付情况下存在,支付id，供后续支付流程使用
        "blacklist_result": 2//!applyFree ? null : 1, // 201支付情况下存在，结构未定
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
    "data": {  //错误信息和错误代码在data字段中也保留一份
        "msg": "信息错误",
        "code": 10000
    },
    "msg": "信息错误",
    "code": 10000,
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
        "status": 1, //支付结果，1=支付中，2=支付成功，3=支付失败
        "blacklist_result": 0 //status=2时，并且订单是黑名单查询订单时，有此字段，0=待查询，1=命中黑名单，2=未命中黑名单
    }
  },
  "/payorder/check-status1": {
    "res": 1,
    "data": {
        "status": 2, //支付结果，1=支付中，2=支付成功，3=支付失败
        "blacklist_result": 0 //status=2时，并且订单是黑名单查询订单时，有此字段，0=待查询，1=命中黑名单，2=未命中黑名单
    }
  },
  "/payorder/check-status2": {
    "res": 1,
    "data": {
        "status": 2, //支付结果，1=支付中，2=支付成功，3=支付失败
        "blacklist_result": 0 //status=2时，并且订单是黑名单查询订单时，有此字段，0=待查询，1=命中黑名单，2=未命中黑名单
    }
  },
  "/payorder/check-status3": {
    "res": 1,
    "data": {
        "status": 2, //支付结果，1=支付中，2=支付成功，3=支付失败
        "blacklist_result": 1 //status=2时，并且订单是黑名单查询订单时，有此字段，0=待查询，1=命中黑名单，2=未命中黑名单
    }
  },

  
  "/loanctcf/check-apply-status": {
    "res": 1,
    "data": {
        "bank_wap":0, //0 = 未认证,1 = 认证中,2 = 已认证,3 = 认证失败,4 = 已过期
        "gjj":2,
        "yys":2,
        "alipay":0,
        "jd":0,
        "idscore":0,
    }
  },
  "/loanctcf/check-alive-result": {
    "res": 1,
    "data": {}
  },
  "/loanctcf/preloan": {
    "res": 1,
    "data": {
        "sug_loan_amount": "50000", //额度
        "sug_term": "24", //期限
        "interest_down": "1.5%", //费率上限
        "interest_up": "1.7%" //费率下限
    }
  },
  "/loanctcf/check-preloan": {
      "res": 1,
    "data": {
        "status": 1, //0=初筛通过，可以申请预授信，1=预授信申请已通过，2=预授信申请已经提交，3=预授信申请被拒绝，4=申请流程已过期，5=当前无法提交预授信申请，6=网银账单已过期，7=网银账单尚未通过审核，8=运营商账单已过期，9=运营商账单尚未通过审核
        "msg": "您的预授信申请已通过", //对应status的信息
        "data": {
            "card_no_last_four_list": [ //允许上传的信用卡尾号列表
              "1234",
              "6789"
            ],
            "sug_loan_amount": "50000", //额度
            "sug_term": "24",  //期限
            "interest_down": "1.5%", //费率上限
            "interest_up": "1.7%", //费率下限
            "time_expire":"2016-12-29 13:10:58" //过期时间
        }
    }
  },
  "/loanctcf/first-filter": {
      "res": 1,
    "data": []
  },
  "/bill/bank-login": {
      "res": 1,
      "data": {
          "ticket_id": "ea8029b2-c81c-11e6-b5e3-00163e00ed7a_1482393720.03", //ticket_id 供二次登录时使用
        "second_login": 0, //是否需要二次登陆，0=不需要，1=需要
        // "val_code": { 
        //     "type": "sms", //验证码类型，sms=手机验证码，img=图片验证码
        //     "value": "null" //图片验证码的base64数据
        // }
      }
  },
  "/bill/bill-list?type=bank_wap&loan_type=4": {
      "res": 1,
      "data": [{
        "id": "14",
        "ticket_id": "1c88b932-d700-11e6-a29d-00163e00ed7a_1484030616.01", //账单唯一id
        "login_target": "0",//登陆id，参考/bill/bank-list
        "username": "18621318729", //登录名
        "time_create": "2017-01-10 14:46:53", //拉取时间
        "status": "8", //账单状态：1=已提交登陆信息，2=登陆失败，3=登陆成功，4=登陆成功，等待二次登陆，5=已提交二次登陆信息，6=二次登陆失败，7=二次登陆成功，等待数据，8=数据获取成功，9=数据获取失败
        //检查状态时：2,4,6,9=失败，8=成功，其他=拉取过程中
        "name_on_card": "徐飞", //type=bank_wap,loan_type=9999,status8 时，有此参数，信用卡账单姓名
        "card_no": "3864" //type=bank_wap,loan_type=9999时，status8 有此参数，信用卡卡号后4位（可能会有多个，之间会用半角逗号分隔）
      }]
  },
  "/loanctcf/check-bill-filter": {
      "res": 1,
      "data": [
          {
            "data_type": "bank_wap", //账单类型，bank_wap=网银，yys=运营商，gjj=公积金
            "data_ticket_id": "730caf04-d6fe-11e6-a29d-00163e00ed7a_1484029902.16", //账单唯一id
            "status": "3", //审核状态：1=已提交，2=审核失败，3=审核通过
            "time_create": "2017-01-10 14:33:00", //数据时间
            "time_expire": "2017-01-11 14:33:00", //审核通过后，过期时间
            "is_expire": 0,//是否已过期，0=没过期，1=已过期
        },
        {
            "data_type": "yys",
            "data_ticket_id": "79b2fe08-d6fe-11e6-a29d-00163e00ed7a_1484029913.32",
            "status": "3",
            "time_create": "2017-01-10 14:33:00",
            "time_expire": "2017-01-11 14:33:00",
            "is_expire": 1,//是否已过期，0=没过期，1=已过期
        }
      ]
  }
}
