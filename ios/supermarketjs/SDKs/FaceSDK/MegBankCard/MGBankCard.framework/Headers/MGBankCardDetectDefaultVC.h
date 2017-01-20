//
//  MGBankCardDetectDefaultVC.h
//  MGBankCard
//
//  Created by 张英堂 on 16/8/18.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGBankCardDetectVC.h"
#import "MGBankCardCheckVC.h"

@interface MGBankCardDetectDefaultVC : MGBankCardDetectVC

/**
 *  银行卡检测完成回调
 */
@property (nonatomic, copy) CardManagerBlcok finishBlock;


@end
