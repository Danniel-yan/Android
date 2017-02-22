//
//  MGBankCardDetectDefaultVC.m
//  MGBankCard
//
//  Created by 张英堂 on 16/8/18.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGBankCardDetectDefaultVC.h"

@interface MGBankCardDetectDefaultVC ()

@end

@implementation MGBankCardDetectDefaultVC


-(void)detectSucess:(MGBankCardModel *)result{
    [super detectSucess:result];
    MGLog(@"*****-->> 银行卡检测完成%@", result.bankCardNumber);
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.4f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (self.navigationController.topViewController == self) {
            
            //            MGBankCardCheckVC *checkVC = [[MGBankCardCheckVC alloc] initWithNibName:nil bundle:nil];
            //            [checkVC setFinishBlock:self.finishBlock];
            //            [checkVC setCardResult:result];
            //            [checkVC setDebug:self.showDebug];
            //            [checkVC setLog:self.log];
            self.finishBlock(result);
            [self dismissViewControllerAnimated:YES completion:nil];
            //            [self.navigationController pushViewController:checkVC animated:YES];
        }
    });
}

@end
