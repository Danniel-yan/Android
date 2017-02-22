//
//  MGIDCardDetectionManager.m
//  BankCardTest
//
//  Created by 张英堂 on 15/12/2.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import "MGBankCardDetectManager.h"
#import "MGBankCardRecognizer.h"
#import "MGBankCardBundle.h"
#import "MGBankCardModel.h"

#import <MGBaseKit/MGBaseKit.h>

#ifndef _CMAP_MG
#define _CMAP_MG

#include <map>
#include <string>

#endif

#define KMaxCount 6
#define KShowCount 3
#define KLastCount 15

#define KBsetConfidence 0.99f
#define KStandardConfidence 0.8f

typedef float BASE_COUNT_TYPE[11];

typedef std::map<int, BASE_COUNT_TYPE*> UDT_MAP_INT_FLOAT_ARRAY;
typedef std::map<int, float> UDT_MAP_INT_FLOAT;

@interface MGBankCardDetectManager ()
{
    
    UDT_MAP_INT_FLOAT_ARRAY nums_count;
    UDT_MAP_INT_FLOAT_ARRAY nums_best;
    UDT_MAP_INT_FLOAT nums_conf;
}

@property (nonatomic, strong) MGBankCardRecognizer *mgCardQA;

@property (nonatomic, strong) NSMutableArray *resultArray;
@property (nonatomic, strong) NSMutableDictionary *resultDic;

@property (nonatomic, assign) BOOL checkFinish;

@end


@implementation MGBankCardDetectManager

-(void)dealloc{
    MGLog(@"%s dealloc", __func__);

    for (auto& e : nums_count) {
        delete[] e.second;
        e.second = nullptr;
    }
    for (auto& e : nums_best) {
        delete[] e.second;
        e.second = nullptr;
    }
    
    self.mgCardQA = nil;
    self.resultArray = nil;
    self.finishBlock = nil;
    self.resultDic = nil;
}

- (void)reset{
    self.checkFinish = NO;
    
    [self.resultArray removeAllObjects];
    [self.resultDic removeAllObjects];
    
    nums_count.clear();
    nums_best.clear();
    nums_conf.clear();
}

-(instancetype)initWithScreenCardBoderSize:(CGRect)boderSize{
    self = [super init];
    if (self) {
        [NSException raise:@"MGBankCardDetectManager 警告！" format:@"initWithScreenCardBoderSize: 该方法已经废弃，请使用 initWithBankNumScale: "];
        return nil;
    }
    return self;
}

-(instancetype)initWithBankNumScale:(MGBankCardNumScale)numScale{
    self = [super init];
    if (self) {
        
        self.resultArray = [NSMutableArray arrayWithCapacity:6];
        self.resultDic = [NSMutableDictionary dictionaryWithCapacity:6];
        _numScale = numScale;
        
        NSData *modelData = [NSData dataWithContentsOfFile:[MGBankCardBundle BankCardPathForResource:BankModelName ofType:BankModelType]];
        
        if (!modelData) {
            [NSException raise:@"资源读取失败!" format:@"无法读取BankModel，请检查资源文件！"];
        }
        
        self.mgCardQA = [[MGBankCardRecognizer alloc] initWithModelData:modelData];
        
        if (self.mgCardQA == nil) return nil;
        
        [self reset];
    }
    return self;
}

//检测每一张图片，目前识别逻辑：图片质量大于0.99直接返回结果，连续5张质量大于0.7的图片，加入对比池中，出现三次相同结果的，即返回结果，否则到达五张，只除去对比池中第一张，重新添加对比
- (void)checkWithBankImage:(UIImage *)image{
    @autoreleasepool {
        @synchronized(self){
            if (_checkFinish == NO) {
                CGRect cropRect1 = CGRectMake(0, 0.2*image.size.height, (1-_numScale.x*2)*image.size.width, 0.7*image.size.width);
                UIImage *lastImage = MGCroppedImage(image, cropRect1);
                CGFloat date1 = [[NSDate date] timeIntervalSince1970] *1000;
                CGRect cropRect = CGRectMake(_numScale.x*image.size.width,
                                             _numScale.y*image.size.height,
                                             (1-_numScale.x*2)*image.size.width,
                                             _numScale.WHScale*image.size.width);
                
                UIImage *tempImage = MGCroppedImage(image, cropRect);
                MGBankCardResult *cardResult = [self.mgCardQA recognizeImage:tempImage];
                
                MGBankCardModel *cardModel = [[MGBankCardModel alloc] initWithBankCardResult:cardResult];
                cardModel.bankCardImage = tempImage;
                
                CGFloat date2 = [[NSDate date] timeIntervalSince1970] *1000;
                
                dispatch_async(dispatch_get_main_queue(), ^{
                    if (self.detectionKeyBlock && !self.checkFinish) {
                        self.detectionKeyBlock(cardModel);
                    }
                    if (!self.checkFinish && self.delegate) {
                        [self.delegate bankCardDetectManager:self
                                              frameKeyResult:cardModel
                                                    timeUsed:(date2-date1)];
                    }
                });
                
                if (cardResult.confidence < KStandardConfidence) {
                    return;
                }
                if (cardResult.confidence > KBsetConfidence) {
                    [self checkFinish:cardResult bankCardImage:lastImage];
                    return;
                }
                
                if ([self startFirstProgerm:cardResult bankCardImage:lastImage] == NO) {
                    [self startSecondProgerm:cardResult bankCardImage:lastImage];
                }
            }
        }
    }}

- (BOOL)startFirstProgerm:(MGBankCardResult *)cardResult bankCardImage:(UIImage *)image{
    [self.resultArray addObject:cardResult];
    
    NSInteger count = [[self.resultDic valueForKey:cardResult.bankCardNumber] integerValue];
    count ++;
    [self.resultDic setValue:@(count) forKey:cardResult.bankCardNumber];
    
    if (count >= KShowCount) {
        [self checkFinish:cardResult bankCardImage:image];
        return YES;
    }
    
    if (self.resultArray.count >= KMaxCount) {
        MGBankCardResult *firstResult = self.resultArray[0];
        
        NSInteger count = [[self.resultDic valueForKey:firstResult.bankCardNumber] integerValue];
        
        if (count > 1) {
            [self.resultDic setValue:@(count--) forKey:firstResult.bankCardNumber];
        }else{
            [self.resultDic removeObjectForKey:firstResult.bankCardNumber];
        }
        
        [self.resultArray removeObjectAtIndex:0];
    }
    return NO;
}
/**
 *  进入第二种监测方案
 *
 *  @param cardResult 银行卡识别结果
 *
 *  @return 是否该方案通过
 */
- (BOOL)startSecondProgerm:(MGBankCardResult *)cardResult bankCardImage:(UIImage *)image{

    const char *cardNum = [cardResult.bankCardNumber cStringUsingEncoding:NSASCIIStringEncoding];
    int cardNumLength = (int)cardResult.bankCardNumber.length;
    float confidence = cardResult.confidence;

    if (nums_count.count(cardNumLength) == 0) {
        nums_count[cardNumLength] = new BASE_COUNT_TYPE[cardNumLength];
        memset(nums_count[cardNumLength], 0, sizeof(BASE_COUNT_TYPE) * cardNumLength);
        nums_conf[cardNumLength] = 0.0f;
        nums_best[cardNumLength] = new BASE_COUNT_TYPE[cardNumLength];
        memset(nums_best[cardNumLength], 0, sizeof(BASE_COUNT_TYPE) * cardNumLength);
    }
    
    nums_conf[cardNumLength] += confidence;
    
    for (int i = 0; i < cardNumLength; ++i) {
        int u = 10;
        if (cardNum[i] != ' ') u = cardNum[i] - '0';
        nums_count[cardNumLength][i][u] += pow(confidence, 3.);
        if (nums_best[cardNumLength][i][u] < confidence)
            nums_best[cardNumLength][i][u] = confidence;
    }
    nums_conf[cardNumLength] += confidence;
    
    int best_len = 0;
    for (const auto& e : nums_conf) {
        if (best_len == 0 || nums_conf[best_len] < e.second)
            best_len = e.first;
    }

    if (nums_conf[best_len] < KLastCount){
        return NO;
    }

    /**
     *  calcuate the answer
     */
    std::string ret = "";
    float sp_conf = 0;
    for (int i = 0; i < best_len; ++i) {
        int best_value = 0;
        for (int j = 1; j <= 10; ++j)
            if (nums_count[best_len][i][j] > nums_count[best_len][i][best_value])
                best_value = j;
        if (best_value == 10) ret += ' ';
        else ret += char(best_value + '0');
        sp_conf += nums_best[best_len][i][best_value];
    }
    sp_conf /= best_len;
    
    //the answer is (ret, sp_conf)
    const  char *stringBuff = ret.c_str();
    NSString *tempBuff = [[NSString alloc] initWithCString:stringBuff encoding:NSASCIIStringEncoding];
    
    cardResult.bankCardNumber = tempBuff;
    
    [self checkFinish:cardResult bankCardImage:image];
    
    return YES;
}

/**
 *  检测银行卡结束
 *  @param bankCardResult 银行卡结果
 *  @param image          银行卡图片
 */
- (void)checkFinish:(MGBankCardResult*)bankCardResult bankCardImage:(UIImage *)image{
    @synchronized (self) {
        
        if (self.checkFinish == NO) {
        self.checkFinish = YES;
        
        MGBankCardModel *cardModel = [[MGBankCardModel alloc] initWithBankCardResult:bankCardResult];
        cardModel.bankCardImage = image;
        
            dispatch_async(dispatch_get_main_queue(), ^{
                if (self.checkFinish && self.finishBlock) {
                    self.finishBlock(cardModel);
                }
                
                if (self.checkFinish && self.delegate) {
                    [self.delegate bankCardDetectManager:self detectSucess:cardModel];
                }
            });
        }
    }
}

@end


