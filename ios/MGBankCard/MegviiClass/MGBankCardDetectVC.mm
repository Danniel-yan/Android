//
//  VideViewController.m
//  KoalaPad
//
//  Created by 张英堂 on 15/2/10.
//  Copyright (c) 2015年 megvii. All rights reserved.
//

#import "MGBankCardDetectVC.h"

@interface MGBankCardDetectVC ()

@end


@implementation MGBankCardDetectVC

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self creatView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewWillAppear:(BOOL)animated{
    [super viewWillAppear:animated];
    
    [self resetSelf];
}

- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:animated];
    
    [self stopVideo];
}

#pragma mark - 界面化定制相关
- (void)creatView{
    self.title = [MGBankCardBundle MGBundleString:@"title_check_video"];;
    
    UIBarButtonItem *backItem = [[UIBarButtonItem alloc] initWithTitle:[MGBankCardBundle MGBundleString:@"title_btn_cancel"]
                                                                 style:UIBarButtonItemStyleDone
                                                                target:self
                                                                action:@selector(backAction:)];
    [self.navigationItem setLeftBarButtonItem:backItem];
    
    CGFloat cardBoxW = MG_WIN_WIDTH*(1-self.numScale.x*2.0);
    CGFloat cardBoxH = cardBoxW/85.6*53.98;
    CGFloat cardNumH = cardBoxH*0.0913;
    if (self.viewType == MGBankCardViewNumBox) {
        cardNumH = cardBoxW * 0.15;
    }
    CGFloat cardNumY = MG_WIN_HEIGHT*self.numScale.y+MG_WIN_WIDTH/2.0*self.numScale.WHScale-cardNumH/2;
    
    self.cardNumRect = CGRectMake(MG_WIN_WIDTH*self.numScale.x, cardNumY, cardBoxW, cardNumH);
    
    self.cardBoxRect = CGRectMake(self.cardNumRect.origin.x,
                                  self.cardNumRect.origin.y-cardBoxH*0.57,
                                  cardBoxW,
                                  cardBoxH);
    
    CGRect numViewRect = self.cardNumRect;
    numViewRect.size.height = 40.0f;
    
    if (self.viewType == MGBankCardViewNumBox) {
        self.messageText = [MGBankCardBundle MGBundleString:@"text_video_label1"];
        numViewRect.origin.y = CGRectGetMinY(self.cardNumRect)-40;
    }else{
        self.messageText = [MGBankCardBundle MGBundleString:@"text_video_label2"];
        numViewRect.origin.y = CGRectGetMinY(self.cardBoxRect)-40;
    }
    
    if (self.showDebug) {
        self.debugInfoView = [[UILabel alloc] initWithFrame:CGRectMake(10, 10, 180, 50)];
        [self.view addSubview:self.debugInfoView];
        [self.debugInfoView setTextColor:MGColorFromRGB(0x0D8921)];
        [self.debugInfoView setNumberOfLines:0];
        [self.debugInfoView setTextAlignment:NSTextAlignmentLeft];
        [self.cardNumView setFont:[UIFont systemFontOfSize:17]];
    }
    
    self.cardNumView = [[UILabel alloc] initWithFrame:CGRectZero];
    [self.view addSubview:self.cardNumView];
    [self.cardNumView setTextColor:[UIColor whiteColor]];
    [self.cardNumView setTextAlignment:NSTextAlignmentCenter];
    [self.cardNumView setFont:[UIFont systemFontOfSize:21]];
    [self.cardNumView setFrame:numViewRect];
}

- (void)setUpCameraLayer
{
    CALayer *viewLayer = [self.view layer];
    if (self.previewLayer == nil) {
        self.previewLayer = [self.videoManager videoPreview];
        [self.previewLayer setFrame:self.view.bounds];
        [viewLayer insertSublayer:self.previewLayer below:[[viewLayer sublayers] objectAtIndex:0]];
        
        self.blackLayer = [[MGCardBoxLayer alloc] initWithViewType:self.viewType];
        [self.blackLayer setFrame:self.previewLayer.bounds];
        [self.blackLayer setCardNumRect:self.cardNumRect];
        [self.blackLayer setCardBoxRect:self.cardBoxRect];
        [viewLayer insertSublayer:self.blackLayer above:self.previewLayer];
        
        [self.blackLayer setNeedsDisplay];
    }
    [self.blackLayer starAnimation];
}

-(void)resetSelf{
    [self setUpCameraLayer];
    [self.cardNumView setText:self.messageText];

    [self.videoManager startRunning];
    [self.cardDetectionManager reset];
}

-(void)stopVideo{
    [self.videoManager stopRunning];
    [self.blackLayer stopAnimation];
}

- (void)backAction:(id)sender{
    [self.navigationController dismissViewControllerAnimated:YES completion:nil];
}

#pragma mark - 检测设置错误
/** 检查设置错误
 *  @return 错误类型*/
- (MGBankSettingErrorType)checkLiveDetectionSetting{
    if (nil == self.videoManager) {
        return MGBankSettingErrorVideoError;
    }
    if (nil == self.videoManager.videoDelegate) {
        return MGBankSettingErrorVideoBlockError;
    }
    if (nil == self.cardDetectionManager) {
        return MGBankSettingErrorDetectionError;
    }
    if (nil == self.cardDetectionManager.delegate) {
        return MGBankSettingErrorDetectionDelegateError;
    }
    return MGBankSettingErrorNone;
}

/* 配置错误 */
- (void)MGSettingErrorAlarm{
    MGBankSettingErrorType settingError = [self checkLiveDetectionSetting];
    if (settingError != MGBankSettingErrorNone) {
        NSString *settringErrorMessage = [NSString stringWithFormat:@"MGBankCardSettingErrorType: %zi", settingError];
        
//        if (self.settingError) {
//            self.settingError(settingError, self.navigationController);
//        }
    }
}

#pragma mark - 检测结果的处理

/**
 *  写入日志log, 格式: time -- banknum -- quality \n
 */
- (void)writeLog:(NSString *)bankNum quality:(CGFloat)quality{
    if (self.log) {
        NSTimeInterval checkDate = [[NSDate date] timeIntervalSince1970];
        NSString *source = [NSString stringWithFormat:@"%0.2f -- %@ -- %.2f\n", checkDate, bankNum, quality];
        
        [[MGLogManager sharedInstance] addLog:source fileName:BankCardLogName];
    }
}

-(void)detectSucess:(MGBankCardModel *)result{
    [super detectSucess:result];
    
    /* 写入log记录 */
    [self writeLog:result.bankCardNumber quality:result.bankCardconfidence];
}

-(void)detecFrameResult:(MGBankCardModel *)result timeUsed:(CGFloat)timeUsed{
    [super detecFrameResult:result timeUsed:timeUsed];
    
    if (self.showDebug) {
        NSString *showString = [NSString stringWithFormat:@"timeUes: %.0fms\nQuality: %.2f", timeUsed, result.bankCardconfidence];
        [self.debugInfoView setText:showString];
    }
    if (result.bankCardconfidence > 0.7) {
        [self.cardNumView setText:result.bankCardNumber];
    }
}




@end