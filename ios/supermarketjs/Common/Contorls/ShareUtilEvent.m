//
//  ShareUtilEvent.m
//  supermarket
//
//  Created by Mackellen on 16/12/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ShareUtilEvent.h"
#import <ShareSDK/ShareSDK.h>
#import <ShareSDKUI/ShareSDK+SSUI.h>
#import "WXApi.h"

@implementation ShareUtilEvent

+ (id)shareInstance{
    static ShareUtilEvent *object;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      object = [ShareUtilEvent new];
    });
    return object;
}


- (void)sharePlatform:(NSInteger)platform diction:(NSDictionary *)diction completionHandler:(void(^)(NSArray *result))completion{
  
  SSDKPlatformType type;

  switch (platform) {
    case 1:
      type = SSDKPlatformTypeSinaWeibo;
      break;
    case 2:
      type = SSDKPlatformSubTypeWechatSession;
      break;
    case 3:
      type = SSDKPlatformSubTypeWechatTimeline;
      break;
    case 4:
      type = SSDKPlatformTypeQQ;
      break;
    case 5:
      type = SSDKPlatformSubTypeQZone;
      break;
    default:
      break;
  }
  
  NSString *title = diction[@"title"];
  NSString *contentStr = diction[@"content"];
  NSString *urlPath = diction[@"url"];
  NSString  *imagePath = diction[@"icon_url"];
  
  if(![title isKindOfClass:[NSString class]]){
     title = @"钞市";
  }
  
  if (![contentStr isKindOfClass:[NSString class]]){
     contentStr = @"你的办卡贷款市场";
  }
  
  if (![urlPath isKindOfClass:[NSString class]]){
     urlPath = @"http://shudu99.com/";
  }
  
  NSMutableArray* imageArray = [NSMutableArray array];
  if (![imagePath isKindOfClass:[NSString class]] || [imagePath isEqualToString:@""]){
    [imageArray addObject:[UIImage imageNamed:@"icon-80"]];
  }else{
      NSData * data = [[NSData alloc] initWithContentsOfURL:[NSURL URLWithString:imagePath]];
      UIImage *image = [[UIImage alloc] initWithData:data];
      [imageArray addObject:image];
  }
  //创建分享参数
  NSMutableDictionary *shareParams = [NSMutableDictionary dictionary];
  [shareParams SSDKSetupShareParamsByText:contentStr images:imageArray //传入要分享的图片
                                    url:[NSURL URLWithString:urlPath]  title:title  type:SSDKContentTypeAuto];
  
  //进行分享
  [ShareSDK share:type   parameters:shareParams onStateChanged:^(SSDKResponseState state, NSDictionary *userData, SSDKContentEntity *contentEntity, NSError *error) { // 回调处理....
       switch (state) {
         case SSDKResponseStateSuccess:
         {
           completion(@[@{@"status":@"success"}]);
           break;
         }
         case SSDKResponseStateFail:
         {
           completion(@[@{@"status":@"faliure"}]);
           break;
         }
           case SSDKResponseStateCancel:
         {
           completion(@[@{@"status":@"cancel"}]);
           break;
         }
         default:
           break;
       }
   }];
  
}




@end
