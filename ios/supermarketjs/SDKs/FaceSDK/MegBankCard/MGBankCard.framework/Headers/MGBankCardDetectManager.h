//
//  MGIDCardDetectionManager.h
//  BankCardTest
//
//  Created by 张英堂 on 15/12/2.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MGBankCardConfig.h"


@protocol BankCardDetectDelegate;

@interface MGBankCardDetectManager : NSObject


-(instancetype)init DEPRECATED_ATTRIBUTE;

/**
 *  初始化方法，必须使用该方法（已废弃，请使用 initWithBankNumScale: 方法）

 *  @param boderSize 银行卡号frame
 *  @return 实例化对象
 */
-(instancetype)initWithScreenCardBoderSize:(CGRect)boderSize DEPRECATED_ATTRIBUTE;


-(instancetype)initWithBankNumScale:(MGBankCardNumScale)numScale;


/**
 *  检测银行卡图像，异步回调
 *
 *  @param image 银行卡图像
 */
- (void)checkWithBankImage:(nullable UIImage *)image;

@property (nonatomic, assign, readonly) MGBankCardNumScale numScale;



@property (nonnull, assign) id<BankCardDetectDelegate> delegate;

/**
 *  显示debug信息
 */
@property (nonatomic, assign) BOOL debug;


/**
 *  银行卡检测 帧 回调。 已经废弃，请使用 delegate 方法。
 */
@property (nonatomic, copy) _Nullable CardManagerBlcok detectionKeyBlock DEPRECATED_ATTRIBUTE;


/**
 *  银行卡检测成功回调，只有在成功后才会回调
 */
@property (nonatomic, copy) _Nullable CardManagerBlcok finishBlock DEPRECATED_ATTRIBUTE;


/**
 *  重置检测器
 */
- (void)reset;



@end



@protocol BankCardDetectDelegate <NSObject>

@optional
/**
 *  每一帧的检测结果
 *  在debug的时候使用
 *  @param manager  manager
 *  @param result   检测结果
 *  @param timeUsed 检测所需时间 单位：毫秒
 */
-(void)bankCardDetectManager:(MGBankCardDetectManager *)manager frameKeyResult:(MGBankCardModel *)result timeUsed:(CGFloat)timeUsed;

/**
 *  银行卡检测完成回调
 *
 *  @param manager manager
 *  @param result  检测成功的结果
 */
-(void)bankCardDetectManager:(MGBankCardDetectManager *)manager detectSucess:(MGBankCardModel *)result;


@end


