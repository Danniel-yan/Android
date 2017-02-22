//
//  TakePhotoVC.m
//  KoalaPhoto
//
//  Created by 张英堂 on 14/11/13.
//  Copyright (c) 2014年 visionhacker. All rights reserved.
//

#import "MGLiveDetectViewController.h"

@interface MGLiveDetectViewController ()

@end

@implementation MGLiveDetectViewController


- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self creatView];
}

- (CGFloat)topViewHeight{
    _topViewHeight = self.navigationController.navigationBar.hidden ? 0 : 64;
    return _topViewHeight;
}

/** 检查设置错误
 *  @return 错误类型*/
- (MGLiveSettingErrorType)checkLiveDetectionSetting{
    if (nil == self.videoManager) {
        return MGLiveSettingErrorVideoError;
    }
    if (nil == self.videoManager.videoDelegate) {
        return MGLiveSettingErrorVideoBlockError;
    }
    if (nil == self.liveManager) {
        return MGLiveSettingErrorDetectionError;
    }
    if (nil == self.liveManager.delegate) {
        return MGLiveSettingErrorDetectionDelegateError;
    }
    return MGLiveSettingErrorNone;
}

/* 配置错误 */
- (void)MGSettingErrorAlarm{
    MGLiveSettingErrorType settingError = [self checkLiveDetectionSetting];
    if (settingError != MGLiveSettingErrorNone) {
        NSString *settringErrorMessage = [NSString stringWithFormat:@"MGLiveSettingErrorType: %zi", settingError];
        
        if (self.settingError) {
            self.settingError(settingError, self.navigationController);
        }
    }
}

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    
    [self setUpCameraLayer];
    [self.videoManager startRecording];
}

- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    
    [self willStatLiveness];
}

-(void)viewWillDisappear:(BOOL)animated{
    
    [self.liveManager stopDetectionQuality];
    [self stopVideoWriter];
    
    [super viewWillDisappear:animated];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/** 创建界面 */
- (void)creatView{
    [self.view setBackgroundColor:[UIColor whiteColor]];

    self.headerView = [[UIImageView alloc] initWithFrame:CGRectZero];
    [self.headerView setContentMode:UIViewContentModeScaleToFill];
    [self.headerView setImage:[MGLiveBundle LiveImageWithName:@"header_bg_img"]];
    [self.headerView setFrame:CGRectMake(0, self.topViewHeight, MG_WIN_WIDTH, MG_WIN_WIDTH)];
    
    self.bottomView = [[MGDefaultBottomManager alloc]
                       initWithFrame:CGRectMake(0, MG_WIN_WIDTH+self.topViewHeight, MG_WIN_WIDTH, MG_WIN_HEIGHT-MG_WIN_WIDTH-self.topViewHeight)
                    andCountDownType:MGCountDownTypeRing];
    
    [self.view addSubview:self.headerView];
    [self.view addSubview:self.bottomView];
    
    if (MG_WIN_HEIGHT == 480) {
        [self.navigationController setNavigationBarHidden:YES];
        [self.headerView setFrame:CGRectMake(0, 0, MG_WIN_WIDTH, MG_WIN_WIDTH)];
        [self.bottomView setFrame:CGRectMake(0, MG_WIN_WIDTH, MG_WIN_WIDTH, MG_WIN_HEIGHT-MG_WIN_WIDTH)];
    }
}

/** 开启活体检测流程 */
- (void)liveFaceDetection{
    [self MGSettingErrorAlarm];
    
    [self.liveManager starDetection];
    [self.bottomView showMessageView:nil];
    [self.videoManager startRecording];
}

-(void)qualitayErrorMessage:(NSString *)error{
    [super qualitayErrorMessage:error];
    
    [self.bottomView showMessageView:error];
}

/** 加载图层预览 */
- (void)setUpCameraLayer
{
    if (!self.previewLayer) {
        CALayer * viewLayer = [self.view layer];
        self.previewLayer = self.videoManager.videoPreview;
        [viewLayer insertSublayer:self.previewLayer below:[[viewLayer sublayers] objectAtIndex:0]];
    }
    [self.view bringSubviewToFront:self.bottomView];
}

/** 播放动作提示动画 */
- (void)starAnimation:(MGLivenessDetectionType )type
                 step:(NSInteger)step
              timeOut:(NSUInteger)timeOut{
    [super starAnimation:type step:step timeOut:timeOut];
    
    [self.bottomView willChangeAnimation:type outTime:timeOut currentStep:step];
    [self.bottomView startRollAnimation];
}

/** 活体检测结束处理 */
- (void)liveDetectionFinish:(MGLivenessDetectionFailedType)type checkOK:(BOOL)check liveDetectionType:(MGLiveDetectionType)detectionType{
    [super liveDetectionFinish:type checkOK:check liveDetectionType:detectionType];
    
    [self.bottomView recoveryWithTitle:[MGLiveBundle LiveBundleString:@"face_check_title3"]];
}


@end
