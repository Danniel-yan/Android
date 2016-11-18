/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "AppDelegateExtend.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import <Bugly/Bugly.h>

#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif


@interface AppDelegate ()

@property (nonatomic, strong) AppDelegateExtend *appDelegateExtend;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  _appDelegateExtend = [AppDelegateExtend sharedInstance];
  [_appDelegateExtend didFinishLaunchingWithOptions:launchOptions];
  
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"src/index.ios" fallbackResource:nil];

    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"supermarketjs"
                                                 initialProperties:nil
                                                     launchOptions:launchOptions];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
}



- (void)applicationDidEnterBackground:(UIApplication *)application {
  [_appDelegateExtend applicationDidEnterBackground:application];
}

- (void)applicationWillEnterForeground:(UIApplication *)application{
  [_appDelegateExtend applicationWillEnterForeground:application];
}


//  

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  [_appDelegateExtend application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}


- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo{
  [_appDelegateExtend application:application didReceiveRemoteNotification:userInfo];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:
(void (^)(UIBackgroundFetchResult))completionHandler {
  [_appDelegateExtend application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

#ifdef NSFoundationVersionNumber_iOS_9_x_Max
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler{
  [_appDelegateExtend jpushNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
}

- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
  [_appDelegateExtend jpushNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
#endif



@end
