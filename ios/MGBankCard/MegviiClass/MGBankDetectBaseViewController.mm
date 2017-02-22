//
//  MGBankDetectBaseViewController.m
//  MGBankCard
//
//  Created by 张英堂 on 16/8/9.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGBankDetectBaseViewController.h"

@interface MGBankDetectBaseViewController ()

@end

@implementation MGBankDetectBaseViewController

-(void)dealloc{
    self.cardDetectionManager = nil;
    self.videoManager = nil;
    
    MGLog(@"%s dealloc", __func__);
}


- (void)defaultSetting{
    if (!self.videoManager) {
        NSString *sessionFrame = [MGAutoSessionPreset autoSessionPreset];
        self.numScale = MGBankDefaultScale();
        
        self.videoManager = [MGVideoManager videoPreset:sessionFrame
                                         devicePosition:AVCaptureDevicePositionBack
                                            videoRecord:NO
                                             videoSound:NO];
        [self.videoManager setVideoDelegate:self];
        
        self.cardDetectionManager = [[MGBankCardDetectManager alloc] initWithBankNumScale:self.numScale];
        [self.cardDetectionManager setDelegate:self];
    }
}

- (instancetype)initWithDefaultSetting{
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        [self defaultSetting];
    }
    return self;
}


- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    if (self.videoManager.videoDelegate != self) {
        [self.videoManager setVideoDelegate:self];
    }
    if (self.cardDetectionManager.delegate != self) {
        [self.cardDetectionManager setDelegate:self];
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
    
}

- (void)detecFrameResult:(MGBankCardModel *)result timeUsed:(CGFloat)timeUsed{
//    MGLog(@"%s: frameResult:%@ timeUsed:%.2f", __func__, result, timeUsed);

}

- (void)detectSucess:(MGBankCardModel *)result{
//    MGLog(@"%s: sucessResult:%@ ", __func__, result);
}

#pragma makr - MGVideoManager delegate
- (void)MGCaptureOutput:(AVCaptureOutput *)captureOutput didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer fromConnection:(AVCaptureConnection *)connection{
    @autoreleasepool {
        UIImage *image = MGFixOrientationWithImage(MGImageFromSampleBuffer(sampleBuffer, UIImageOrientationRight));
        [self.cardDetectionManager checkWithBankImage:image];
    }
}


#pragma mark - MGBankCardDetectManager delegate
-(void)bankCardDetectManager:(MGBankCardDetectManager *)manager frameKeyResult:(MGBankCardModel *)result timeUsed:(CGFloat)timeUsed{
    [self detecFrameResult:result timeUsed:timeUsed];
}

-(void)bankCardDetectManager:(MGBankCardDetectManager *)manager detectSucess:(MGBankCardModel *)result{
    [self detectSucess:result];
}


@end
