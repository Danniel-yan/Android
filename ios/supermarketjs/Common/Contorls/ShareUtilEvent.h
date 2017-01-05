//
//  ShareUtilEvent.h
//  supermarket
//
//  Created by Mackellen on 16/12/21.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ShareUtilEvent : NSObject

+ (id)shareInstance;

- (void)sharePlatform:(NSInteger)platform diction:(NSDictionary *)diction completionHandler:(void(^)(NSArray *result))completion;

@end
