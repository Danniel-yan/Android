//
//  MGBankCardConfig.h
//  MGBankCard
//
//  Created by 张英堂 on 15/12/12.
//  Copyright © 2015年 megvii. All rights reserved.
//

#ifndef MGBankCardConfig_h
#define MGBankCardConfig_h

#import <UIKit/UIKit.h>
@class MGBankCardModel;

typedef void(^CardManagerBlcok)(MGBankCardModel * _Nullable  result);


//存放银行卡log的文件key
static NSString *const BankCardLogName = @"backCardlog.text";
static NSString *const BankModelName = @"BankCardModel";
static NSString *const BankModelType = @"resource";

/**
 *  银行卡检测样式
 */
typedef NS_ENUM(NSInteger, MGBankCardViewType) {
    MGBankCardViewNumBox = 1,   //只有数字部分的线框
    MGBankCardViewCardBox = 2   //框出卡片的所有部分
};


/**
 *  银行卡检测各项配置错误类型
 */
typedef NS_ENUM(NSInteger, MGBankSettingErrorType) {
    /** 没有错误 */
    MGBankSettingErrorNone,
    /** videoManager没有设置 */
    MGBankSettingErrorVideoError,
    /**  videoManager 已经设置，但是没有实现 videoblcok 代理 */
    MGBankSettingErrorVideoBlockError,
    /**  MGBankCardDetectManager 没有设置 */
    MGBankSettingErrorDetectionError,
    /**  MGBankCardDetectManager 已经设置，但是没有设置代理对象*/
    MGBankSettingErrorDetectionDelegateError,
};


typedef struct {
    CGFloat x;          //银行卡号区域的Y轴 相对位置
    CGFloat y;          //银行卡号参见区域的 相对高
    CGFloat WHScale;    //左边偏移 相对距离
}MGBankCardNumScale;


CG_INLINE MGBankCardNumScale MGBankNumScaleMake(CGFloat x, CGFloat y){
    MGBankCardNumScale s;
    s.y = y;
    s.x = x;
    s.WHScale = 108.0/408.0;
    return s;
}

CG_INLINE BOOL MGBankNumScaleIsZero(MGBankCardNumScale scale){
    return !(scale.y || scale.x || scale.WHScale);
}


/**
 *  默认的银行卡号区域比例
 */
CG_INLINE  MGBankCardNumScale  MGBankDefaultScale(){
    return MGBankNumScaleMake(0.03, 0.35);
}
CG_INLINE  MGBankCardNumScale  MGBankNumScaleZero(){
    return MGBankNumScaleMake(0, 0);
}





#endif /* MGBankCardConfig_h */
