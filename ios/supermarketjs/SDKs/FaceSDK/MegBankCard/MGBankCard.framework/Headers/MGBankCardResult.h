//
//  MGBankCardResult.h
//  bankcard
//
//  Created by binghezhouke on 15/12/10.
//  Copyright © 2015年 杨沐. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface MGBankCardChar : NSObject
@property(nonatomic,copy) NSString *chracter;
@property(nonatomic, readonly, assign) float confidence;

@end

@interface MGBankCardResult : NSObject

@property (nonatomic, copy) NSString *bankCardNumber;
@property (nonatomic, readonly, assign) float confidence;
@property (nonatomic, readonly, strong) NSArray* characters;


@end
