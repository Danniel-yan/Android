//
//  MGBankCardModel.h
//  MGBankCard
//
//  Created by 张英堂 on 16/2/25.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import <UIKit/UIKit.h>

@class MGBankCardResult;

@interface MGBankCardModel : NSObject

@property (nonatomic, strong) UIImage *bankCardImage;

@property (nonatomic, copy) NSString *bankCardNumber;

@property (nonatomic, assign) CGFloat bankCardconfidence;


- (instancetype)initWithBankCardResult:(MGBankCardResult *)result;



@end
