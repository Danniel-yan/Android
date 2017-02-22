//
//  MGIDCardDefaultViewController.m
//  MGIDCard
//
//  Created by 张英堂 on 16/8/18.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGIDCardDefaultViewController.h"

@interface MGIDCardDefaultViewController ()

@end

@implementation MGIDCardDefaultViewController

- (void)detectSucess:(MGIDCardQualityResult *)result{
    [super detectSucess:result];
    
    MGIDCardModel *model = [[MGIDCardModel alloc] initWithResult:result];
    if (self.finishBlock && self){
        self.finishBlock(model);
    }
    [self dismissViewControllerAnimated:YES completion:nil];
}


- (void)cancelIDCardDetect{
    [super cancelIDCardDetect];
    
    if (self.errorBlcok && self) {
        self.errorBlcok(MGIDCardErrorCancel);
    }
    [self dismissViewControllerAnimated:YES completion:nil];
}

@end
