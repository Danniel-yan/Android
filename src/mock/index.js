
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
