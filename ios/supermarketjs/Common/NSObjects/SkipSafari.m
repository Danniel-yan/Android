//
//  SkipSafari.m
//  supermarket
//
//  Created by 张阳浩 on 17/3/2.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkipSafari.h"
#import "AppDelegate.h"
@implementation SkipSafari
RCT_EXPORT_MODULE()
RCT_EXPORT_METHOD(skipSafariForUrlStr:(NSString *)UrlStr)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:UrlStr]];
  });
}
@end
