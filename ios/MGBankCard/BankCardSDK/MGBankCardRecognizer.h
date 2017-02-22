//
//  MGBankCardAssessment.h
//  MGBankCardAssessment
//
//  Created by yangmu on 15/8/3.
//  Copyright (c) 2015 Megvii. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "MGBankCardResult.h"



@interface MGBankCardRecognizer : NSObject

-(instancetype _Nullable)initWithModelData:(NSData * _Nonnull)modelData;


-(MGBankCardResult* _Nullable) recognizeImage: (UIImage* _Nonnull) image ;

-(MGBankCardResult* _Nullable) recognizeImage: (UIImage* _Nonnull) image ROI:(CGRect)ROI;

/*!
 *  获取版本信息
 *
 *  @return 版本描述
 */
+(NSString* _Nonnull) getVersion;


@end
