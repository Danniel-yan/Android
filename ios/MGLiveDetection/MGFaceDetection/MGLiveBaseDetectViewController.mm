//
//  MGLiveBaseDetectViewController.m
//  MGLivenessDetection
//
//  Created by 张英堂 on 16/8/5.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGLiveBaseDetectViewController.h"

@interface MGLiveBaseDetectViewController ()

@end

@implementation MGLiveBaseDetectViewController

-(void)dealloc{
    self.videoManager = nil;
    self.liveManager = nil;
    
    MGLog(@"%s", __func__);
}

- (instancetype)initWithDefauleSetting{
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        [self defaultSetting];
    }
    return self;
}

- (void)defaultSetting{
    if (self.liveManager == nil && self.videoManager == nil) {
        
        self.videoManager = [MGVideoManager videoPreset:AVCaptureSessionPreset640x480
                                         devicePosition:AVCaptureDevicePositionFront
                                            videoRecord:NO
                                             videoSound:NO];
        
        MGLiveActionManager *ActionManager = [MGLiveActionManager LiveActionRandom:YES
                                                                       actionArray:nil
                                                                       actionCount:3];
        
        MGLiveErrorManager *errorManager = [[MGLiveErrorManager alloc] initWithFaceCenter:CGPointMake(0.5, 0.35)];
        self.liveManager = [[MGLiveDetectionManager alloc] initWithActionTime:10.0f
                                                                actionManager:ActionManager
                                                                 errorManager:errorManager];
        
        [self.liveManager setDelegate:self];
        [self.videoManager setVideoDelegate:self];
    }
}



- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    if (self.liveManager.delegate != self) {
        self.liveManager.delegate = self;
    }
    if (self.videoManager.videoDelegate != self) {
        self.videoManager.videoDelegate = self;
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/**  即将启动活体检测，延迟 0.2S */
- (void)willStatLiveness{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2f * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self liveFaceDetection];
    });
}

/** 完成录像 */
- (void)stopVideoWriter{
    @synchronized (self) {
        NSString *videoPath = [self.videoManager stopRceording];
        MGLog(@"videoSavePath :%@", videoPath);
    }
}

/** 播放动作提示动画 */
- (void)starAnimation:(MGLivenessDetectionType )type
                 step:(NSInteger)step
              timeOut:(NSUInteger)timeOut{
}

- (void)qualitayErrorMessage:(NSString *)error{
}

/** 活体检测结束处理 */
- (void)liveDetectionFinish:(MGLivenessDetectionFailedType)type checkOK:(BOOL)check liveDetectionType:(MGLiveDetectionType)detectionType{
    [self stopVideoWriter];

}

#pragma mark - video manager delegate
-(void)MGCaptureOutput:(AVCaptureOutput *)captureOutput didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer fromConnection:(AVCaptureConnection *)connection{
    
    if (self.isViewLoaded) {
        [self.liveManager detectionWithSampleBuffer:sampleBuffer orientation:UIImageOrientationRight];
    }
}

#pragma mark - MGLiveDetectionManager delegate
- (void)detectionManager:(MGLiveDetectionManager *)manager finishWithStep:(MGLiveStep)step{
    
    if (manager.detectionType == MGLiveDetectionTypeQualityOnly) {
        [self liveDetectionFinish:DETECTION_FAILED_TYPE_MASK
                          checkOK:YES
                liveDetectionType:MGLiveDetectionTypeQualityOnly];
    }
}

- (void)detectionManager:(MGLiveDetectionManager *)manager frameWithImage:(MGLivenessDetectionFrame *)frame{
}

- (void)detectionManager:(MGLiveDetectionManager *)manager finishWithError:(MGLivenessDetectionFailedType)failedType{
    
    [self liveDetectionFinish:failedType
                      checkOK:NO
            liveDetectionType:MGLiveDetectionTypeAll];
}

- (void)detectionManager:(MGLiveDetectionManager *)manager liveChangeAction:(MGLivenessDetectionType)actionType timeOut:(NSUInteger)timeOut currentActionStep:(NSUInteger)step{
    [self starAnimation:actionType step:step timeOut:timeOut];
}

- (void)detectionManager:(MGLiveDetectionManager *)manager checkError:(NSString *)error{
    [self qualitayErrorMessage:error];
}

-(void)detectionManagerSucessLiveDetection:(MGLiveDetectionManager *)manager liveDetectionType:(MGLiveDetectionType)detectionType{
    [self liveDetectionFinish:DETECTION_FAILED_TYPE_MASK
                      checkOK:YES
            liveDetectionType:detectionType];
}


@end
