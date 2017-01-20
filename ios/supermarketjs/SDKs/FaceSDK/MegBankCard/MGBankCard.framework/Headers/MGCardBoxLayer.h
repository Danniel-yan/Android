//
//  MGCardBoxLayer.h
//  MGBankCard
//
//  Created by 张英堂 on 16/7/28.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import <QuartzCore/QuartzCore.h>
#import "MGBankCardConfig.h"

@interface MGCardBoxLayer : CALayer

/**
 *  初始化方法
 *
 *  @param viewType 界面样式
 *
 *  @return 实例化对象
 */
-(instancetype)initWithViewType:(MGBankCardViewType)viewType;


/**
 *  默认 为MGBankCardViewNumBox
 */
@property (nonatomic, assign, readonly) MGBankCardViewType viewType;

/**
 *  设置 银行卡号区域 (必须设置)
 */
@property (nonatomic, assign) CGRect cardNumRect;

/**
 *  银行卡全部区域 （MGBankCardViewCardBox 类型时，必须设置）
 */
@property (nonatomic, assign) CGRect cardBoxRect;


/* 开启闪动动画 */
-(void)starAnimation;

/* 关闭闪动动画 */
- (void)stopAnimation;


@end
