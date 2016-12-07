//
//  JpushModule.m
//  supermarket
//
//  Created by Mackellen on 16/11/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "JpushModule.h"
#import "JPUSHService.h"

@implementation JpushModule

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(setAlias:(NSString *)pushAlias)
{
    [JPUSHService setAlias:pushAlias callbackSelector:@selector(pushNotificationEvent:) object:nil];
}

RCT_EXPORT_METHOD(setAliasAndTags:(NSString *)pushAlias tags:(NSSet *)tags)
{
  [JPUSHService setTags:tags alias:pushAlias callbackSelector:@selector(pushNotificationEvent:) object:nil];
}

- (void)pushNotificationEvent:(id)sender{

}

//RCT_EXPORT_METHOD(pushNotificationEvent:(id)sender)
//{
//  
//}

@end
