//
//  StatisticalEvent.h
//  supermarket
//
//  Created by Mackellen on 16/11/24.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface StatisticalEvent : NSObject<RCTBridgeModule>

- (void)onEvent:(NSString *)eventId;
- (void)onEventWithAttributes:(NSString *)eventId attributes:(NSDictionary *)attributes;

@end
