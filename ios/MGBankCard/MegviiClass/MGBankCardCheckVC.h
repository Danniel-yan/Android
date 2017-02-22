//
//  IDCardCheckVC.h
//  BankCardTest
//
//  Created by 张英堂 on 15/12/1.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MGBankCardConfig.h"

@class MGBankCardModel;

@interface MGBankCardCheckVC : UIViewController

/**
 *  银行卡检测完成回调
 */
@property (nonatomic, copy) CardManagerBlcok finishBlock;


/**
 *  银行卡的检测结果，由该页面显示并且校正
 */
@property (nonatomic, strong) MGBankCardModel *cardResult;


/**
 *  是否记录 log
 */
@property (nonatomic, assign) BOOL log DEPRECATED_ATTRIBUTE;


/**
 *  显示debug信息
 */
@property (nonatomic, assign) BOOL debug;

@end
