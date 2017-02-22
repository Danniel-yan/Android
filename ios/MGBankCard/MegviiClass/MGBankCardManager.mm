
//
//  CardCheckManger.m
//  OCRSDK_Test
//
//  Created by 张英堂 on 15/8/6.
//  Copyright (c) 2015年 megvii. All rights reserved.
//

#import "MGBankCardManager.h"
#import "MGBankCardDetectDefaultVC.h"
#import "MGBankCardRecognizer.h"

#import <MGBaseKit/MGBaseKit.h>
#import "MGBankNavigationController.h"

static NSString *const cardManagerKey = @"megviicardmanagerkey";

@interface MGBankCardManager ()



@end

@implementation MGBankCardManager

-(void)dealloc{
    MGLog(@"%s dealloc", __func__);
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.log = NO;
        self.debug = NO;
        self.viewType = MGBankCardViewNumBox;
    }
    return self;
}

- (void)CardStart:(nonnull UIViewController *)viewController
           finish:( void(^ _Nullable )(MGBankCardModel * _Nullable result))finish{
    
    MGBankCardDetectDefaultVC *detectionVC = [[MGBankCardDetectDefaultVC alloc] initWithDefaultSetting];
    
    [detectionVC setFinishBlock:finish];
    [detectionVC setShowDebug:self.debug];
    [detectionVC setLog:self.log];
    [detectionVC setViewType:self.viewType];
    UINavigationController *navigation = [[MGBankNavigationController alloc] initWithRootViewController:detectionVC];
    
    [viewController presentViewController:navigation animated:YES completion:nil];
}

+ (NSString * _Nonnull)BankCardVarsion{
    
    return [MGBankCardRecognizer getVersion];
}


//伪实现
+ (BOOL)getLicense{
    return YES;
}


@end





