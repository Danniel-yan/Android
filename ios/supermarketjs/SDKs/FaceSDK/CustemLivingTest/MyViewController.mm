//
//  MyViewController.m
//  MegLiveDemo
//
//  Created by 张英堂 on 16/6/8.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MyViewController.h"
#import "MyBottomView.h"
#import "MyFinishViewController.h"

@interface MyViewController ()

@end

@implementation MyViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  UIButton *rightBut = [UIButton buttonWithType:UIButtonTypeSystem];
  [rightBut setTitle:@"返回" forState:UIControlStateNormal];
  [rightBut setTitleColor:[UIColor grayColor] forState:UIControlStateNormal];
  rightBut.frame = CGRectMake(10, 0, 40, 40);
  self.navigationItem.leftBarButtonItem =[[UIBarButtonItem alloc] initWithCustomView:rightBut];
  [rightBut addTarget:self action:@selector(dissmissView) forControlEvents:UIControlEventTouchUpInside];
    // Do any additional setup after loading the view.
}

- (void)dissmissView{
  [self dismissViewControllerAnimated:YES completion:nil];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)defaultSetting{
    if (self.liveManager == nil && self.self.videoManager == nil) {
        
        MGLiveActionManager *ActionManager = [MGLiveActionManager LiveActionRandom:YES
                                                                       actionArray:nil
                                                                       actionCount:3];
        MGLiveErrorManager *errorManager = [[MGLiveErrorManager alloc] initWithFaceCenter:CGPointMake(0.5, 0.4)];
        
        MGVideoManager *videoManager = [MGVideoManager videoPreset:AVCaptureSessionPreset640x480
                                                    devicePosition:AVCaptureDevicePositionFront
                                                       videoRecord:NO
                                                        videoSound:NO];
        
        MGLiveDetectionManager *liveManager = [[MGLiveDetectionManager alloc]initWithActionTime:8
                                                                                  actionManager:ActionManager
                                                                                   errorManager:errorManager];
        
        [self setLiveManager:liveManager];
        [self setVideoManager:videoManager];
    }
}

//创建界面
-(void)creatView{
    self.title = @"活体检测";
    self.headerView = [[UIImageView alloc] initWithFrame:CGRectZero];
    [self.headerView setImage:[MGLiveBundle LiveImageWithName:@"header_bg_img"]];
    [self.headerView setContentMode:UIViewContentModeScaleAspectFill];
    [self.headerView setFrame:CGRectMake(0, self.topViewHeight, MG_WIN_WIDTH, MG_WIN_WIDTH)];
    
    self.bottomView = [[MyBottomView alloc] initWithFrame:CGRectMake(0, MG_WIN_WIDTH+self.topViewHeight, MG_WIN_WIDTH, MG_WIN_HEIGHT-MG_WIN_WIDTH-self.topViewHeight)
                                                   andCountDownType:MGCountDownTypeRing];
    [self.view addSubview:self.headerView];
    [self.view addSubview:self.bottomView];
}

//活体检测结束处理
- (void)liveDetectionFinish:(MGLivenessDetectionFailedType)type checkOK:(BOOL)check liveDetectionType:(MGLiveDetectionType)detectionType{
    [super liveDetectionFinish:type checkOK:check liveDetectionType:detectionType];
    
//    MyFinishViewController *finishVC = [[MyFinishViewController alloc] initWithNibName:nil bundle:nil];
//    [finishVC setCheckOK:check];
    if (check == YES) {
        FaceIDData *faceData = [self.liveManager getFaceIDData];
      if (self.block) {
        self.block(faceData);
      }
//        [finishVC setFaceData: faceData];
    }
    
//    [self.navigationController pushViewController:finishVC animated:YES];
}


@end
