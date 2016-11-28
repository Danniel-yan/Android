//
//  JpushModule.h
//  supermarket
//
//  Created by Mackellen on 16/11/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface JpushModule : NSObject<RCTBridgeModule>

- (void)setAlias:(NSString *)pushAlias;
- (void)setAliasAndTags:(NSString *)pushAlias tags:(NSSet *)tags;

@end
