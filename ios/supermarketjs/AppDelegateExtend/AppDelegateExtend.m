//
//  AppDelegateExtend.m
//  supermarket
//
//  Created by Mackellen on 16/11/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "AppDelegateExtend.h"
#import "JPUSHService.h"
#import "ConstantVariables.h"
#import <Bugly/Bugly.h>
#import "IQKeyboardManager.h"
#import <UMMobClick/MobClick.h>

#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

@interface AppDelegateExtend ()<JPUSHRegisterDelegate>

@end

@implementation AppDelegateExtend

+ (instancetype)sharedInstance{
  static AppDelegateExtend* instance;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    instance = [AppDelegateExtend new];
  });
  return instance;
}

- (void)didFinishLaunchingWithOptions:(NSDictionary *)launchOptions{
  
    [Bugly startWithAppId:MKBuglyAppID];
  
    [MobClick setLogEnabled:YES];
    UMConfigInstance.appKey = MKUMengAppKey;
    UMConfigInstance.channelId = @"App Store";
    [MobClick startWithConfigure:UMConfigInstance];
  
  
    [[IQKeyboardManager sharedManager] setEnableAutoToolbar:YES];
    [[IQKeyboardManager sharedManager] setShouldResignOnTouchOutside:YES];
  
  
    if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
  #ifdef NSFoundationVersionNumber_iOS_9_x_Max
      JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
      entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
      [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  #endif
    }else if([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
      //可以添加自定义categories
      [JPUSHService registerForRemoteNotificationTypes:(UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert)
                                            categories:nil];
    }
    
    //如不需要使用IDFA，advertisingIdentifier 可为nil
    [JPUSHService setupWithOption:launchOptions appKey:MKJPushAppKey channel:MKJPushAppChannel  apsForProduction:NO advertisingIdentifier:nil];
    
    //2.1.9版本新增获取registration id block接口。
    [JPUSHService registrationIDCompletionHandler:^(int resCode, NSString *registrationID) {
        if(resCode == 0){
          NSLog(@"registrationID获取成功：%@",registrationID);
        }else{
          NSLog(@"registrationID获取失败，code：%d",resCode);
        }
    }];
  
//  [JPUSHService setAlias:@"8edfa090bc6211e698467cd30ab8f4e6" callbackSelector:@selector(pushNotificationEvent:) object:nil];
  
}

//- (void)pushNotificationEvent:(id)sender{
//
//}

- (void)applicationDidEnterBackground:(UIApplication *)application{
    [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
}

- (void)applicationWillEnterForeground:(UIApplication *)application{
  [application setApplicationIconBadgeNumber:0];
  [application cancelAllLocalNotifications];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
    [JPUSHService registerDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
    [JPUSHService handleRemoteNotification:userInfo];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:
(void (^)(UIBackgroundFetchResult))completionHandler {
  [JPUSHService handleRemoteNotification:userInfo];
  
  if ([[UIDevice currentDevice].systemVersion floatValue]<10.0 || application.applicationState>0) {
//    [rootViewController addNotificationCount];
  }
  completionHandler(UIBackgroundFetchResultNewData);
}


#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#pragma mark- JPUSHRegisterDelegate
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  NSDictionary * userInfo = notification.request.content.userInfo;
  
  UNNotificationRequest *request = notification.request; // 收到推送的请求
  UNNotificationContent *content = request.content; // 收到推送的消息内容
  
  NSNumber *badge = content.badge;  // 推送消息的角标
  NSString *body = content.body;    // 推送消息体
  UNNotificationSound *sound = content.sound;  // 推送消息的声音
  NSString *subtitle = content.subtitle;  // 推送消息的副标题
  NSString *title = content.title;  // 推送消息的标题
  
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
  }
  else {
    // 判断为本地通知
    NSLog(@"iOS10 前台收到本地通知:{\nbody:%@，\ntitle:%@,\nsubtitle:%@,\nbadge：%@，\nsound：%@，\nuserInfo：%@\n}",body,title,subtitle,badge,sound,userInfo);
  }
  completionHandler(UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionSound|UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以设置
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  UNNotificationRequest *request = response.notification.request; // 收到推送的请求
  UNNotificationContent *content = request.content; // 收到推送的消息内容
  
  NSNumber *badge = content.badge;  // 推送消息的角标
  NSString *body = content.body;    // 推送消息体
  UNNotificationSound *sound = content.sound;  // 推送消息的声音
  NSString *subtitle = content.subtitle;  // 推送消息的副标题
  NSString *title = content.title;  // 推送消息的标题
  
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
  }else{
    // 判断为本地通知
    NSLog(@"iOS10 收到本地通知:{\nbody:%@，\ntitle:%@,\nsubtitle:%@,\nbadge：%@，\nsound：%@，\nuserInfo：%@\n}",body,title,subtitle,badge,sound,userInfo);
  }
  completionHandler();  // 系统要求执行这个方法
}
#endif



@end
