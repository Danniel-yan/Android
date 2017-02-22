//
//  MGBankCardModel.m
//  MGBankCard
//
//  Created by 张英堂 on 16/2/25.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGBankCardModel.h"

#import "MGBankCardResult.h"

@implementation MGBankCardModel

- (instancetype)initWithBankCardResult:(MGBankCardResult *)result{
    self = [super init];
    if (self) {
        
        self.bankCardconfidence = result.confidence;
        self.bankCardNumber = result.bankCardNumber;
    }
    return self;
}

@end
