import { get, responseStatus } from 'utils/fetch';
import alert from 'utils/alert';

const dd = [
        { "id": "1", "subject": "111111111", "content": "111111 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "2", "subject": "2账单添加成功", "content": "2222222 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "3", "subject": "3账单添加成功", "content": "33333333 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-21 16:05:03" },
        { "id": "4", "subject": "4账单添加成功", "content": "444444 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "5", "subject": "4账单添加成功", "content": "您新添加了 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "6", "subject": "账单添加成功", "content": "您新添加了 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "7", "subject": "账单添加成功", "content": "您新添加了 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-20 16:05:03" },
        { "id": "8", "subject": "账单添加成功", "content": "您新添加了 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "9", "subject": "账单添加成功", "content": "您新添加了 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "0", "subject": "账单添加成功", "content": "您新添加了 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" },
        { "id": "1", "subject": "账单添加成功", "content": "您新添加了 车贷(A6L) 账单，快去首页看看哦！", "time_create": "2016-09-22 16:05:03" }
    ];

export default function(pos = 0) {

  return dispatch => {

    dispatch(pos == 0 ? fetchingMessages(pos) : paginationMessages(pos));

    setTimeout(() => {
      dispatch(receiveMessages(dd.slice(), pos));
    }, 1000)
    return;
    get(`/user/message?pos=${pos}`)
      .then(response => {
        if(response.res === responseStatus.success) {
          dispatch(receiveMessages(response.data, pos));
        }
      }).catch(err => alert('网络错误'));
  };
}

function fetchingMessages(pos) {
  return {
    type: 'fetchingMessages',
    pos
  };
}

function paginationMessages(pos) {
  return {
    type: 'paginationMessages',
    pos
  };
}

function receiveMessages(messages, pos) {
  return {
    type: 'receiveMessages',
    messages,
    pos: pos + messages.length,
    nomore: messages.length === 0,
  };
}
