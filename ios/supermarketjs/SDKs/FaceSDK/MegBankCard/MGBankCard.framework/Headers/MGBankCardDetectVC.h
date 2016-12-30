//
//  VideViewController.h
//  KoalaPad
//
//  Created by 张英堂 on 15/2/10.
//  Copyright (c) 2015年 megvii. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreGraphics/CoreGraphics.h>
#import <CoreText/CoreText.h>

#import "MGBankDetectBaseViewController.h"
#import "MGCardBoxLayer.h"
#import "MGBankCardBundle.h"


@interface MGBankCardDetectVC : MGBankDetectBaseViewController

/* 以下方法如有需要请重写即可。 */
/** 创建界面。 在 viewDidLoad 时被调用*/
- (void)creatView;
/** 创建视频预览界面 并且开启中间一闪一闪的动画。 在 viewWillAppear 被调用*/
- (void)setUpCameraLayer;

/** 恢复界面信息。 在 viewWillAppear 被调用*/
-(void)resetSelf;

/** 停止视频， 停止动画。在 viewWillDisappear 被调用 */
-(void)stopVideo;


/**
 *  默认 为MGBankCardViewNumBox
 */
@property (nonatomic, assign) MGBankCardViewType viewType;

/**
 *  显示DEBUG信息
 */
@property (nonatomic, assign) BOOL showDebug;

/**
 *  写入检测结果记录
 */
@property (nonatomic, assign) BOOL log DEPRECATED_ATTRIBUTE;



#pragma mark - 界面元素
@property (nonatomic, copy)  NSString *messageText; //提示信息，没有任何动作之前
@property (nonatomic, assign) CGRect cardNumRect;   //银行卡号区域
@property (nonatomic, assign) CGRect cardBoxRect;   //银行卡区域

@property (nonatomic, strong) UILabel *cardNumView;             //显示银行卡号 （质量大于0.8的）
@property (nonatomic, strong) UILabel *debugInfoView;           //显示debug信息
@property (nonatomic, strong) MGCardBoxLayer *blackLayer;       //黑色遮罩 该界面的所有信息均为直接draw画上去



@end
