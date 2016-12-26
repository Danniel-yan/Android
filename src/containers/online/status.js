
export default {
  0: '账单审核通过',
  1: '没有账单信息',
  2: '登陆中',
  3: '登陆成功,账单拉取中',
  4: '账单拉取失败',
  5: '初筛未通过',
  6: '账单审核中',
  7: '账单审核失败',
  8: '账单审核已过期'
};

export const successStatus = [0];
export const failureStatus = [1, 4, 5, 7, 8];
export const processingStatus = [2, 3, 6];

export function parseStatus(status) {
  if(successStatus.includes(status)) {
    return 'success';
  } 

  if(failureStatus.includes(status)) {
    return 'failure';
  } 

  return 'processing';
}
