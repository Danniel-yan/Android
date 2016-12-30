//
//  CardCheckManger.h
//  OCRSDK_Test
//
//  Created by 张英堂 on 15/8/6.
//  Copyright (c) 2015年 megvii. All rights reserved.
//

#import "MGBankCardResult.h"
#import <MGBaseKit/MGBaseKit.h>
#import "MGBankCardConfig.h"

@class MGBankCardModel;

@interface MGBankCardManager : MGLicenseManager

/**
 *  默认 为MGBankCardViewNumBox
 */
@property (nonatomic, assign) MGBankCardViewType viewType;


/**
 *  银行卡检测启动
 *
 *  @param viewController push出界面的viewcontroller指针，以及检测结束返回时，到该界面，不允许为空
 *  @param finish         银行卡检测结束block回调
 */
- (void)CardStart:(nonnull UIViewController *)viewController
           finish:(void(^ _Nullable)(MGBankCardModel * _Nullable result))finish;


/**
 * 实时显示帧率，视频流质量信息（直接在videolayer上显示）
 */
@property (nonatomic, assign) BOOL debug;

/**
 *  写入log识别日志
 */
@property (nonatomic, assign) BOOL log DEPRECATED_ATTRIBUTE;


/**
 *  获取银行卡检测版本号
 *  @return 版本号
 */
+ (NSString * _Nonnull)BankCardVarsion;

@end

