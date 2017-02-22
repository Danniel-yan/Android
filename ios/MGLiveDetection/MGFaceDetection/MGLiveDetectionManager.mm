//
//  MGLiveDetectionManager.m
//  MGLivenessDetection
//
//  Created by 张英堂 on 16/3/29.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGLiveDetectionManager.h"
#import "MGLiveBundle.h"

typedef struct {
    float faceQuality = 0;
    MGLivenessDetectionFrame *faceFrame;
}TempFaceFrame;

@interface MGLiveDetectionManager ()<MGLivenessProtocolDelegate>
{
    CGFloat _motionY;
    TempFaceFrame _bestFrame;
}
@property (nonatomic, strong) MGLivenessDetector *livenessDetector;
@property (nonatomic, strong) MGLiveActionManager *actionManager;
@property (nonatomic, strong) CMMotionManager *motionManager;
/**
 *  每个活动动作的超时时间，单位秒， 默认10秒
 */
@property (nonatomic, assign) NSUInteger actionTimeOut;
@property (nonatomic, assign) NSUInteger currentActionStep;
@property (nonatomic, assign) NSUInteger liveActionCount;
@property (nonatomic, assign) MGLiveStep currentLiveStep;

@property (nonatomic, assign) BOOL canDetectImage;


/* 设置错误提示类，仅限内部使用 */
- (void)changeErrorManager:(MGLiveErrorManager *)manager;

@end


@implementation MGLiveDetectionManager

-(void)dealloc{
    self.livenessDetector = nil;
    self.motionManager = nil;
    self.delegate = nil;
    self.actionManager = nil;
}

- (instancetype)initWithActionTime:(NSUInteger)timeOut
                     actionManager:(MGLiveActionManager *)actionManager
                      errorManager:(MGLiveErrorManager *)errorManager{
    self = [super init];
    if (self) {
        self.liveActionCount = [actionManager getActionCount];
        self.actionTimeOut = timeOut;
        self.actionManager = actionManager;
        
        self.detectionType = MGLiveDetectionTypeAll;
        [self changeErrorManager:errorManager];
        
        self.motionManager = [[CMMotionManager alloc] init];
        self.motionManager.accelerometerUpdateInterval = 0.3f;
        
        NSData *modelData = [NSData dataWithContentsOfFile:[MGLiveBundle LivePathForResource:MGLiveModelName
                                                                                      ofType:MGLiveModelType]];
        if (!modelData) {
            [NSException raise:@"资源读取失败!"
                        format:@"无法读取facemodel，请检查资源文件！"];
        }
        
        NSDictionary *faceOptions = @{MGlivenessDetectorModelRawData:modelData,
                                      MGLivenessDetectorStepTimeLimit:@(self.actionTimeOut)};
        
        self.livenessDetector = [MGLivenessDetector detectorOfOptions:faceOptions];
        [self.livenessDetector setDelegate:self];
        [self.livenessDetector changeDetectionType:DETECTION_TYPE_AIMLESS];
        
        if (self.livenessDetector == nil) {
            return nil;
        }
        
        [self stopDetection];
    }
    return self;
}

- (instancetype)initWithActionTimeOut:(NSUInteger)timeOut
                     andActionManager:(MGLiveActionManager *)actionManager
{
    [NSException raise:@"MGLiveDetectionManager"
                format:@"该初始化方法已经废弃，请使用 initWithActionTime:actionManager:errorManager"];
     
    self = [super init];
    if (self) {
        self.liveActionCount = [actionManager getActionCount];
        self.actionTimeOut = timeOut;
        self.actionManager = actionManager;

        self.detectionType = MGLiveDetectionTypeAll;
        _errorManager = [[MGLiveErrorManager alloc] init];

        self.motionManager = [[CMMotionManager alloc] init];
        self.motionManager.accelerometerUpdateInterval = 0.3f;
        
        NSData *modelData = [NSData dataWithContentsOfFile:[MGLiveBundle LivePathForResource:MGLiveModelName
                                                                                      ofType:MGLiveModelType]];
        NSAssert(modelData, @"无法读取facemodel，请检查资源文件！");
        NSDictionary *faceOptions = @{MGlivenessDetectorModelRawData:modelData,
                                      MGLivenessDetectorStepTimeLimit:@(self.actionTimeOut)};
        
        self.livenessDetector = [MGLivenessDetector detectorOfOptions:faceOptions];
        [self.livenessDetector setDelegate:self];
        [self.livenessDetector changeDetectionType:DETECTION_TYPE_AIMLESS];
        
        if (self.livenessDetector == nil) {
            return nil;
        }
        
        [self stopDetection];
    }
    return self;
}

- (void)changeErrorManager:(MGLiveErrorManager *)manager{
    @synchronized (self) {
        if (manager != nil) {
            _errorManager = manager;
        }
    }
}

- (void)starDetection{
    [self starDetectionWithStep:MGLiveStepQuality];
}

- (void)stopDetectionQuality{
    [self stopDetection];
}

- (void)recoveryData:(MGLiveStep )step{
    @synchronized (self) {
        _currentActionStep = 0;
        self.canDetectImage = YES;
        _currentLiveStep = step;

        [self.livenessDetector reset];
    }
}

- (void)stopDetection{
    self.canDetectImage = NO;
}

- (void)starDetectionWithStep:(MGLiveStep)step{
    [self recoveryData:step];

    switch (step) {
        case MGLiveStepDetection:
        {
            [self.motionManager stopAccelerometerUpdates];
            MGLivenessDetectionType actionType = [self.actionManager resetAndRandomActionType];
            [self.livenessDetector changeDetectionType:actionType];
            
            dispatch_async(dispatch_get_main_queue(), ^{
                if (self.delegate ) {
                    [self.delegate detectionManager:self
                                   liveChangeAction:actionType
                                            timeOut:self.actionTimeOut
                                  currentActionStep:_currentActionStep];
                }
            });
        }
            break;
        case MGLiveStepQuality:
        {
            [self.livenessDetector changeDetectionType:DETECTION_TYPE_AIMLESS];
            
            NSOperationQueue *motionQueue = [[NSOperationQueue alloc] init];
            [motionQueue setName:@"com.megvii.gryo"];
            [self.motionManager startAccelerometerUpdatesToQueue:motionQueue
                                                     withHandler:^(CMAccelerometerData * _Nullable accelerometerData, NSError * _Nullable error) {
                                                         _motionY = accelerometerData.acceleration.y;
                                                     }];
        }
            break;
        default:
            break;
    }
}

- (void)detectionWithSampleBuffer:(CMSampleBufferRef)buffer orientation:(UIImageOrientation)orientation;{
    @synchronized (self) {
        @autoreleasepool {
            if (self.canDetectImage && self.livenessDetector && buffer) {
                [self.livenessDetector detectWithBuffer:buffer orientation:orientation];
            }
        }
    }
}

#pragma mark -
-(NSArray*) getValidFrame{
    return [self.livenessDetector getValidFrame];
}
-(FaceIDData*)getFaceIDDataWithMaxImageSize:(int)maxSize{
    return [self.livenessDetector getFaceIDDataWithMaxImageSize:maxSize];
}

-(FaceIDData*)getFaceIDData{
    return [self.livenessDetector getFaceIDData];
}

- (MGLivenessDetectionFrame *)getBestQualityFrame{
    if (self.detectionType == MGLiveDetectionTypeQualityOnly) {
        return _bestFrame.faceFrame;
    }
    return nil;
}
-(NSString*) getAlgorithmLog{
    return [self.livenessDetector getAlgorithmLog];
}

/**
 *  一个步骤结束的操作
 */
- (void)detectionTypeQualityFinish{
    dispatch_sync(dispatch_get_main_queue(), ^{
        if (self.delegate ) {
            [self.delegate detectionManager:self finishWithStep:_currentLiveStep];
        }
    });
    
    switch (self.detectionType) {
        case MGLiveDetectionTypeAll:
        {
            _currentLiveStep = MGLiveStepDetection;
            [self starDetectionWithStep:MGLiveStepDetection];
        }
            break;
        case MGLiveDetectionTypeQualityOnly:
        {
//            [self stopDetection];
        }
            break;
        default:
            break;
    }
}

#pragma mark - mglivenessdetection delegate
-(void)onFrameDetected:(MGLivenessDetectionFrame *)frame andTimeout:(float) timeout{
    
    dispatch_async(dispatch_get_main_queue(), ^{
        if (self.canDetectImage && self.delegate) {
            [self.delegate detectionManager:self frameWithImage:frame];
        }
    });

    @synchronized (self) {
        if (_currentLiveStep == MGLiveStepQuality && self.detectionType == MGLiveDetectionTypeQualityOnly) {
            
            if (_bestFrame.faceQuality < frame.attr.smooth_quality) {
                _bestFrame.faceFrame = frame;
                _bestFrame.faceQuality = frame.attr.smooth_quality;
            }
        }
        
        if (_currentLiveStep == MGLiveStepQuality) {
            
            NSString *message = [self.errorManager checkImgWithMGFrame:frame motionY:_motionY];
            if (message) {
                
                if ([message isEqualToString:MGFaceFinishKey]) {
                    [self detectionTypeQualityFinish];
                }else{
                    dispatch_async(dispatch_get_main_queue(), ^{
                        
                        if (self.canDetectImage && self.delegate) {
                            [self.delegate detectionManager:self checkError:message];
                        }
                    });
                }
            }
        }
    }
}

-(void)onDetectionFailed:(MGLivenessDetectionFailedType)failedType{
    if (_currentLiveStep == MGLiveStepQuality) {
        [self.livenessDetector reset];
    }else{
        [self stopDetection];

        dispatch_async(dispatch_get_main_queue(), ^{
            if (self.delegate ) {
                [self.delegate detectionManager:self finishWithError:failedType];
            }
            
        });
    }
}

- (MGLivenessDetectionType)onDetectionSuccess:(MGLivenessDetectionFrame *)faceInfo{
    
    __block MGLivenessDetectionType detectionType = DETECTION_TYPE_AIMLESS;

    if (_currentLiveStep == MGLiveStepDetection) {
        _currentActionStep++;
        
        @synchronized (self) {
            if (_currentActionStep < self.liveActionCount) {
                detectionType = [self.actionManager randomActionType];
                
                dispatch_async(dispatch_get_main_queue(), ^{
                    if (self.canDetectImage && self.delegate) {
                        [self.delegate detectionManager:self
                                       liveChangeAction:detectionType
                                                timeOut:self.actionTimeOut
                                      currentActionStep:_currentActionStep];
                    }
                });
            }else{
                [self stopDetection];

                dispatch_async(dispatch_get_main_queue(), ^{
                    if (self.delegate) {
                        [self.delegate detectionManager:self finishWithStep:MGLiveStepDetection];
                        [self.delegate detectionManagerSucessLiveDetection:self liveDetectionType:self.detectionType];
                    }
                });
                
                detectionType = DETECTION_TYPE_NONE;
            }
        }
    }
    
    return detectionType;
}

@end
