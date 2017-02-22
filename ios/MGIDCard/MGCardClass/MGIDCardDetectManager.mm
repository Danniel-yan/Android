
//
//  CardCheckManger.m
//  OCRSDK_Test
//
//  Created by 张英堂 on 15/8/6.
//  Copyright (c) 2015年 megvii. All rights reserved.
//

#import "MGIDCardDetectManager.h"
#import <MGBaseKit/MGBaseKit.h>
#import "MGIDCardBundle.h"

@interface MGIDCardDetectManager ()

/** 检测完成开关 */
@property (nonatomic, assign) BOOL detectFinish;

@property (nonatomic, strong) MGIDCardQualityAssessment *mgCardQA;

/**
 *  0 for 正面, 1 for 反面
 */
@property (nonatomic, assign) MGIDCardSide IDCardSide;

/**
 *  屏幕方向，默认横屏
 */
@property (nonatomic, assign) MGIDCardScreenOrientation screenOrientation;


@end

@implementation MGIDCardDetectManager


-(void)dealloc{
    self.delegate = nil;
    self.mgCardQA = nil;
    
    MGLog(@"%s dealloc", __func__);
}

+ (instancetype)idCardCheckWithDelegate:(id<MGIDCardDetectDelegate>)delegate
                              cardSide:(MGIDCardSide)side
                     screenOrientation:(MGIDCardScreenOrientation)screenOrientation{
    
    MGIDCardDetectManager *checkManager = [[MGIDCardDetectManager alloc] init];
    checkManager.screenOrientation = screenOrientation;
    checkManager.delegate = delegate;
    checkManager.IDCardSide = side;
    
    return checkManager;
}

+(instancetype)idCardManagerWithCardSide:(MGIDCardSide)side
                       screenOrientation:(MGIDCardScreenOrientation)screenOrientation{
    MGIDCardDetectManager *checkManager = [[MGIDCardDetectManager alloc] init];
    checkManager.screenOrientation = screenOrientation;
    checkManager.IDCardSide = side;
    
    return checkManager;
}

- (instancetype)init{
    self = [super init];
    if (self) {
        
        self.screenOrientation = MGIDCardScreenOrientationLandscapeLeft;
        self.IDCardScaleRect = MGIDCardScaleZero();
        
        NSString *modelPath = [MGIDCardBundle IDCardPathForResource:IDCardModelName ofType:IDCardModelType];
        NSData *modelData = [NSData dataWithContentsOfFile:modelPath options:NSDataReadingMappedIfSafe error:nil];
        if (!modelData) {
            [NSException raise:@"资源读取失败!" format:@"无法读取MGIDCardModel.model，请检查资源文件！"];
        }
        
        self.mgCardQA = [MGIDCardQualityAssessment assessmentOfOptions:@{MGIDCardQualityAssessmentModelRawData:modelData}];
        
        [self reset];
    }
    return self;
}

- (void)detectWithImage:(UIImage *)image{
    [self checkWithImage:image];
}

- (void)checkWithImage:(UIImage *)image{
    @autoreleasepool {
        @synchronized(self) {
            if (self.detectFinish == NO) {
                CGRect checkRect = [self droppedCardImgRect:image.size];
                
                
                MGIDCardQualityResult *result = [self.mgCardQA getQualityWithImage:image
                                                                              side:self.IDCardSide
                                                                               ROI:checkRect];
                
                dispatch_async(dispatch_get_main_queue(), ^{
                    if (self.delegate) {
                        [self.delegate cardCheck:self finish:result];
                    }
                });
            }
        }
    }
}

- (void)reset{
    self.detectFinish = NO;
}
- (void)stopDetect{
    self.detectFinish = YES;
}

//获取 在图片的尺寸上 裁剪 框的大小
- (CGRect)droppedCardImgRect:(CGSize)imageSize{
    
    if (MGIDCardScaleIsZero(self.IDCardScaleRect)) {
        [NSException raise:@"MGIDCardDetectManager 设置错误!" format:@"请设置 MGIDCardDetectManager 类的 IDCardScaleRect 属性!"];
    }
    
    CGRect tempRect = CGRectZero;
    if (self.screenOrientation == MGIDCardScreenOrientationLandscapeLeft) {
        tempRect = CGRectMake((imageSize.width-imageSize.height*(1-self.IDCardScaleRect.y*2)*self.IDCardScaleRect.WHScale)*self.IDCardScaleRect.x,
                              imageSize.height*self.IDCardScaleRect.y,
                              imageSize.height*(1-self.IDCardScaleRect.y*2)*self.IDCardScaleRect.WHScale,
                              imageSize.height*(1-self.IDCardScaleRect.y*2));
    }else{

        tempRect = CGRectMake(imageSize.width*self.IDCardScaleRect.x,
                              imageSize.height*self.IDCardScaleRect.y,
                              imageSize.width*(1-self.IDCardScaleRect.x*2),
                              imageSize.width*(1-self.IDCardScaleRect.x*2)/self.IDCardScaleRect.WHScale);
    }
    
    return tempRect;
}

- (NSString *)getErrorShowString:(MGIDCardFailedType)errorType{
    NSString *string = nil;

    switch (errorType) {
        case QUALITY_FAILED_TYPE_NOIDCARD:
        {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title1"];
        }
            break;
        case QUALITY_FAILED_TYPE_WRONGSIDE:
        {
            if (!self.IDCardSide) {
                string = [MGIDCardBundle MGIDBundleString:@"card_error_title2"];
            }else{
                string =[MGIDCardBundle MGIDBundleString:@"card_error_title3"];
            }
        }
            break;
        case QUALITY_FAILED_TYPE_TILT:
        {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title4"];
        }
            break;
        case QUALITY_FAILED_TYPE_SIZETOOSMALL:
        {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title5"];
        }
            break;
        case QUALITY_FAILED_TYPE_SIZETOOLARGE:
        {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title6"];
        }
            break;
        case QUALITY_FAILED_TYPE_SPECULARHIGHLIGHT:
        {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title7"];
        }
            break;
        case QUALITY_FAILED_TYPE_OUTSIDETHEROI:
        {
            string = [MGIDCardBundle MGIDBundleString:@"card_error_title8"];
        }
            break;
        default:
            string = @"";
            break;
    }

    return string;
}

@end
