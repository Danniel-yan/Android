//
//  MGBankNavigationController.m
//  MGBankCard
//
//  Created by 张英堂 on 16/2/23.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGBankNavigationController.h"
#import <MGBaseKit/MGBaseKit.h>

@interface MGBankNavigationController ()

@end

@implementation MGBankNavigationController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self changeNaviItemStyle];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

//更改navigation 样式
- (void)changeNaviItemStyle
{
    [self.navigationBar setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]}];
    [self.navigationBar setTintColor:[UIColor whiteColor]];
    [self.navigationBar setBarTintColor:MGColorWithRGB(41, 45, 56, 1)];
}

//更改状态栏颜色
- (UIStatusBarStyle)preferredStatusBarStyle{
    return UIStatusBarStyleLightContent;
}



@end
