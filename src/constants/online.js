//0=初筛通过，1=没有初筛信息，2=初筛审核中，3=初筛审核拒绝，4=初筛审核已过期
export const firstFilterStatusSuccess = 0; 


//0=初筛通过，可以申请预授信，1=预授信申请已通过，2=预授信申请已经提交，3=预授信申请被拒绝，4=申请流程已过期，5=当前无法提交预授信申请，6=网银账单已过期，7=网银账单尚未通过审核，8=运营商账单已过期，9=运营商账单尚未通过审核
export const preloanStatus = {
  success: 1,
  expire: 4,
  failure: 3,
};
