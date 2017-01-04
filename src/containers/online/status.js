
export default {
  0: '账单审核通过',
  1: '没有账单信息',
  2: '登陆中',
  3: '登陆成功,账单拉取中',
  4: '账单拉取失败',
  5: '初筛未通过',
  6: '账单审核中',
  7: '账单审核失败',
  8: '账单审核已过期',
  9: '当前不在初筛状态',
  10: '登录中，可中断'
};

export const successStatus = [0];
export const failureStatus = [2, 4, 6, 8, 9];
export const processingStatus = [3, 5, 7];

export function parseStatus(status) {
  if(successStatus.includes(status)) {
    return 'success';
  } 

  if(failureStatus.includes(status)) {
    return 'failure';
  } 

  return 'processing';
}
