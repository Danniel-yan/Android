//
//  MGBankCardBundle.m
//  MGBankCard
//
//  Created by 张英堂 on 15/12/11.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import "MGBankCardBundle.h"

static NSString *const FaceBundleKey = @"MGBankCardResource.bundle";
static NSString *const FaceBundleName = @"MGBankCardResource";
static NSString *const FaceBundleType = @"bundle";
static NSString *const FaceStringKey = @"MGBankCard";


@implementation MGBankCardBundle

+(NSString *)BankCardPathForResource:(NSString *)name ofType:(NSString *)type{
    
    return  [[NSBundle mainBundle] pathForResource:name ofType:type inDirectory:FaceBundleKey];
}


+ (NSString *)MGBundleString:(NSString *)key{
    NSBundle *mgBundel = [NSBundle bundleWithPath:[[NSBundle mainBundle] pathForResource:FaceBundleName ofType:FaceBundleType]];
    
    NSString *testString = NSLocalizedStringFromTableInBundle(key, FaceStringKey, mgBundel, nil);
    return testString;
}


@end
