//
//  MGBankDetectBaseViewController.h
//  MGBankCard
//
//  Created by 张英堂 on 16/8/9.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MGBaseKit/MGBaseKit.h>

#import "MGBankCardConfig.h"
#import "MGBankCardModel.h"
#import "MGBankCardDetectManager.h"


///**
// *  银行卡号图片最佳分辨率 408*108
// */
//#define KNumScaleBoderY             0.35                //银行卡号区域的Y轴 相对位置
//#define KNumScaleCropHeight         (108.0/408.0)       //银行卡号参见区域的 相对高
//#define KNumScaleLeftOffset         0.03                //左边偏移 相对距离

@interface MGBankDetectBaseViewController : UIViewController<MGVideoDelegate, BankCardDetectDelegate>

/**
 *  默认设置初始化方法，在不想配置对象的情况下
 *
 *  @return 初始化方法
 */
- (instancetype)initWithDefaultSetting;

/**
 *  不使用默认配置设置的时候，必须设置该对象
 */
@property (nonatomic, strong) MGBankCardDetectManager *cardDetectionManager;

/**
 *  不使用默认配置设置的时候，必须设置该对象
 */
@property (nonatomic, strong) MGVideoManager *videoManager;

/**
 *  视频预览界面
 */
@property (nonatomic, strong) AVCaptureVideoPreviewLayer *previewLayer;


@property (nonatomic, assign) MGBankCardNumScale numScale;

/**
 *  银行卡检测每一帧的结果
 *  每一帧检测结果都会被调用，子类重写即可
 *  @param result   检测结果
 *  @param timeUsed 消耗时间
 */
- (void)detecFrameResult:(MGBankCardModel *)result timeUsed:(CGFloat)timeUsed;

/**
 *  检测成功时候被调用
 *  子类重写
 *  @param result 检测成功结果
 */
- (void)detectSucess:(MGBankCardModel *)result;

@end
