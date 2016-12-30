//
//  MGBankCardBundle.h
//  MGBankCard
//
//  Created by 张英堂 on 15/12/11.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MGBankCardBundle : NSObject

/**
 *  获取bundle中的文件路径
 *
 *  @param name 文件名字
 *  @param type 文件类型
 *
 *  @return 文件路径
 */
+ (NSString *)BankCardPathForResource:(NSString *)name ofType:(NSString *)type;


/**
 *  获取 string
 *
 *  @param key string的key
 *
 *  @return string
 */
+ (NSString *)MGBundleString:(NSString *)key;



@end
