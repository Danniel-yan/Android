//
//  FeedbackModule.m
//  supermarket
//
//  Created by 张阳浩 on 16/12/26.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "FeedbackModule.h"

#import <YWFeedbackFMWK/YWFeedbackKit.h>
#import "ConstantVariables.h"

@interface FeedbackModule()
@property (nonatomic, strong) YWFeedbackKit        *feedbackKit;
@property (nonatomic , strong)  UIViewController  *YWFeedbackVC;

@end
@implementation FeedbackModule
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(openFeedback)
{
  __weak typeof(self) weakSelf = self;
  dispatch_async(dispatch_get_main_queue(), ^{
    [weakSelf openFeedbackViewController];
    
  });
}

- (void)openFeedbackViewController
{
  __weak typeof(self) weakSelf = self;
  self.feedbackKit = [[YWFeedbackKit alloc] initWithAppKey:MKOpenIMAPPKey];
  //    [[YWFeedbackKit alloc] initWithOpenIMUserId:MKOpenIMUserId password:MKOpenIMPassword appKey:MKOpenIMAPPKey];
  [_feedbackKit makeFeedbackViewControllerWithCompletionBlock:^(YWFeedbackViewController *viewController, NSError *error) {
    if ( viewController != nil ) {
      weakSelf.YWFeedbackVC = viewController;
      viewController.title = @"用户反馈";
      UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:viewController];
      UIViewController *rootVC = (UIViewController*)[UIApplication sharedApplication].keyWindow.rootViewController;
      nav.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;

      [rootVC presentViewController:nav animated:YES completion:nil];
      __weak typeof(nav) weakNav = nav;
      UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"return_button"] style:UIBarButtonItemStylePlain target:self action:@selector(backBarButtonAction:)];
//      item.tintColor = [MKColor c999999Color];
      viewController.navigationItem.leftBarButtonItem = item;
      [viewController setOpenURLBlock:^(NSString *aURLString, UIViewController *aParentController) {
        UIViewController *webVC = [[UIViewController alloc] initWithNibName:nil bundle:nil];
        UIWebView *webView = [[UIWebView alloc] initWithFrame:webVC.view.bounds];
        webView.autoresizingMask = UIViewAutoresizingFlexibleWidth|UIViewAutoresizingFlexibleHeight;
        [webVC.view addSubview:webView];
        [weakNav pushViewController:webVC animated:YES];
        [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:aURLString]]];
      }];
    }
  }];
}


- (void)backBarButtonAction:(id)sender{
  [self.YWFeedbackVC dismissViewControllerAnimated:YES completion:nil];
}




@end
