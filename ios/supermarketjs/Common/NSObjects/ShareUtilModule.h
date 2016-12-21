//
//  ShareUtilModule.h
//  supermarket
//
//  Created by Mackellen on 16/12/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface ShareUtilModule : NSObject<RCTBridgeModule>

// 微信好友圈分享
- (void)circle:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

// 微信好友分享
- (void)weixin:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

// 新浪微博分享
- (void)sina:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

// qq空间分享
- (void)qzone:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject;

// qq好友分享
- (void)qq:(NSDictionary *)readableMap resolver:(RCTPromiseResolveBlock)resolve  rejecter:(RCTPromiseRejectBlock)reject;

@end
