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
- (void)circle:(NSDictionary *)readableMap callback:(RCTPromiseResolveBlock)callback;

// 微信好友分享
- (void)weixin:(NSDictionary *)readableMap callback:(RCTPromiseResolveBlock)callback;

// 新浪微博分享
- (void)sina:(NSDictionary *)readableMap callback:(RCTPromiseResolveBlock)callback;

// qq空间分享
- (void)qzone:(NSDictionary *)readableMap callback:(RCTPromiseResolveBlock)callback;

// qq好友分享
- (void)qq:(NSDictionary *)readableMap callback:(RCTPromiseResolveBlock)callback;

@end
