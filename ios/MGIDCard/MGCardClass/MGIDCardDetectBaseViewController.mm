//
//  MGIDCardDetectBaseViewController.m
//  MGIDCard
//
//  Created by 张英堂 on 16/8/10.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGIDCardDetectBaseViewController.h"


@interface MGIDCardDetectBaseViewController ()

@end

@implementation MGIDCardDetectBaseViewController

-(void)dealloc{
    self.videoManager = nil;
    self.cardCheckManager = nil;
}

- (void)defaultSetting{
    if (self.cardCheckManager == nil) {
        self.cardCheckManager = [MGIDCardDetectManager idCardManagerWithCardSide:self.IDCardSide
                                                               screenOrientation:self.screenOrientation];
        
        NSString *sessionFrame = [MGAutoSessionPreset autoSessionPreset];
        self.videoManager = [MGVideoManager videoPreset:sessionFrame
                                         devicePosition:AVCaptureDevicePositionBack
                                            videoRecord:NO
                                             videoSound:NO];
        [self.videoManager setVideoDelegate:self];
        [self.cardCheckManager setDelegate:self];
    }
}

- (instancetype)initWithDefaultSetting{
    self = [super initWithNibName:nil bundle:nil];
    if (self) {
        self.screenOrientation = MGIDCardScreenOrientationLandscapeLeft;
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
    
    if (self.cardCheckManager.delegate != self) {
        [self.cardCheckManager setDelegate:self];
    }
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (void)detectFrameError:(NSArray *)errorArray{
}

- (void)detectSucess:(MGIDCardQualityResult *)result{
    [self.cardCheckManager stopDetect];
}

#pragma makr - MGVideoManager delegate
- (void)MGCaptureOutput:(AVCaptureOutput *)captureOutput didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer fromConnection:(AVCaptureConnection *)connection{
    @autoreleasepool {
//        UIImage *tempImage = nil;
//        
//        switch (self.screenOrientation) {
//            case MGIDCardScreenOrientationPortrait:
//            {
//                UIImage *newImage = MGImageFromSampleBuffer(sampleBuffer, UIImageOrientationRight);
//                tempImage = MGFixOrientationWithImage(newImage);
//
//            }
//                break;
//            default:
//            {
//                tempImage = MGImageFromSampleBuffer(sampleBuffer, UIImageOrientationUp);
//            }
//                break;
//        }
//        
//        [self.cardCheckManager detectWithImage:tempImage];
        
        UIImage *tempImage = nil;
        if (self.screenOrientation == MGIDCardScreenOrientationPortrait){
            UIImage *newImage = MGImageFromSampleBuffer(sampleBuffer, UIImageOrientationRight);
            tempImage = MGFixOrientationWithImage(newImage);
        }else{
            tempImage = MGImageFromSampleBuffer(sampleBuffer, UIImageOrientationUp);
        }
        
        [self.cardCheckManager checkWithImage:tempImage];
    }
}

#pragma mark - idcardDetectManager delegate
-(void)cardCheck:(MGIDCardDetectManager *)manager finish:(MGIDCardQualityResult *)result{
    if (result.isValid == YES) {
        [self detectSucess:result];
    }else{
        if (result.fails.count > 0) {
            [self detectFrameError:result.fails];
        }
    }
}

@end
