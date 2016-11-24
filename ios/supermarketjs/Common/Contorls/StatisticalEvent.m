//
//  StatisticalEvent.m
//  supermarket
//
//  Created by Mackellen on 16/11/24.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "StatisticalEvent.h"
#import <UMMobClick/MobClick.h>

@implementation StatisticalEvent

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(onEvent:(NSString *)eventId)
{
    [MobClick event:eventId];
}

RCT_EXPORT_METHOD(onEventWithAttributes:(NSString *)eventId attributes:(NSDictionary *)attributes)
{
    if (attributes.allKeys.count > 0) {
      [MobClick event:eventId attributes:attributes];
    }else{
      [MobClick event:eventId];
    }
}


@end
