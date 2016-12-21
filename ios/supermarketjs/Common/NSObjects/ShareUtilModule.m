//
//  ShareUtilModule.m
//  supermarket
//
//  Created by Mackellen on 16/12/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ShareUtilModule.h"
#import "ShareUtilEvent.h"

@implementation ShareUtilModule

RCT_EXPORT_MODULE()

#pragma mark - 微信好友圈分享
RCT_EXPORT_METHOD(circle:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if([readableMap isKindOfClass:[NSDictionary class]]){
    [[ShareUtilEvent shareInstance] sharePlatform:3 diction:readableMap completionHandler:resolve];
  }
}

#pragma mark - 微信好友分享
RCT_EXPORT_METHOD(weixin:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if([readableMap isKindOfClass:[NSDictionary class]]){
    [[ShareUtilEvent shareInstance] sharePlatform:2 diction:readableMap completionHandler:resolve];
  }
}

#pragma mark - 新浪微博分享
RCT_EXPORT_METHOD(sina:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if([readableMap isKindOfClass:[NSDictionary class]]){
    [[ShareUtilEvent shareInstance] sharePlatform:1 diction:readableMap completionHandler:resolve];
  }
}

#pragma mark - qq空间分享
RCT_EXPORT_METHOD(qzone:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if([readableMap isKindOfClass:[NSDictionary class]]){
    [[ShareUtilEvent shareInstance] sharePlatform:5 diction:readableMap completionHandler:resolve];
  }
}

#pragma mark - qq好友分享
RCT_EXPORT_METHOD(qq:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if([readableMap isKindOfClass:[NSDictionary class]]){
    [[ShareUtilEvent shareInstance] sharePlatform:4 diction:readableMap completionHandler:resolve];
  }
}


@end
