
var Mock = require('mockjs');

Mock.setup({
  timeout: '1000-3000'
})

Mock.mock('recommend.json',[
  {
    name: '员工贷-小额贷',
    dec: '推荐，线上申请',
    apply:'12434',
    rate:'0.55-0.99%',
    thumbnail: 'https://facebook.github.io/react/img/logo_og.png'
  },
  {
    name: '员工贷-小额贷',
    dec: '推荐，线上申请',
    apply:'43143',
    rate:'0.55-0.99%',
    thumbnail: 'https://facebook.github.io/react/img/logo_og.png'
  },
  {
    name: '员工贷-小额贷',
    dec: '推荐，线上申请',
    apply:'4214',
    rate:'0.55-0.99%',
    thumbnail: 'https://facebook.github.io/react/img/logo_og.png'
  }
])

Mock.mock('bannerImages.json',[{
    uri: "https://oss.aliyuncs.com/tengniu-pic/cms/focusmaps/focusmaps-20161008101033.jpg"
    },{
    uri: "https://sysapp.jujinpan.cn/static/pages/pboc/dist/29533a15de4d8ac3f2badcb77b25800d.jpg"
    },{
    uri: "https://facebook.github.io/react/img/logo_og.png"
}])

//broadcastMsgList
Mock.mock('broadcastMsgList.json',[
  "broadcast***1",
  "broadcast***2",
  "broadcast***3",
  "broadcast***4",
  "broadcast***5",
  "broadcast***6",
  "broadcast***7",
  "broadcast***8",
])
