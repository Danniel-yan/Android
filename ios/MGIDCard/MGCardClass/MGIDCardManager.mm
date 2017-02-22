//
//  MGIDCardManager.m
//  MGIDCard
//
//  Created by 张英堂 on 15/12/28.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import "MGIDCardManager.h"
#import "MGIDCardDefaultViewController.h"

@implementation MGIDCardManager

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.screenOrientation = MGIDCardScreenOrientationLandscapeLeft;
    }
    return self;
}

- (void)IDCardStartDetection:(UIViewController *)ViewController
                  IdCardSide:(MGIDCardSide)CardSide
                      finish:(void(^)(MGIDCardModel *model))finish
                        errr:(void(^)(MGIDCardError errorType))error{
#if TARGET_IPHONE_SIMULATOR
    if (error)
        error(MGIDCardErrorSimulator);
#else
    
    MGIDCardDetectManager *cardCheckManager = [MGIDCardDetectManager idCardManagerWithCardSide:CardSide
                                                                             screenOrientation:self.screenOrientation];
    
    NSString *sessionFrame = [MGAutoSessionPreset autoSessionPreset];
    MGVideoManager *videoManager = [MGVideoManager videoPreset:sessionFrame
                                     devicePosition:AVCaptureDevicePositionBack
                                        videoRecord:NO
                                         videoSound:NO];
    
    MGIDCardDefaultViewController *first = [[MGIDCardDefaultViewController alloc] initWithNibName:nil bundle:nil];
    [first setVideoManager:videoManager];
    [first setCardCheckManager:cardCheckManager];
    
    [first setFinishBlock:finish];
    [first setErrorBlcok:error];
    
    if (MG_IOS_SysVersion < 8.0) {
        [first setScreenOrientation:MGIDCardScreenOrientationPortrait];
    }else{
        [first setScreenOrientation:self.screenOrientation];
    }

    [ViewController presentViewController:first animated:YES completion:nil];
#endif

}

+ (NSDate *)getLicenseDate{
    NSDictionary *licenseDic = [MGIDCardQualityAssessment checkCachedLicense];
    
    NSDate *sdkDate = [licenseDic valueForKey:[self IDCardVersion]];
    
    return sdkDate;
}

+ (BOOL)getLicense{
    
    NSString *sdkVersion = [self IDCardVersion];
    MGLog(@"version : %@", sdkVersion);
    
    NSArray *sdkInfo = [sdkVersion componentsSeparatedByString:@","];
    if (sdkInfo.count > 1) {
        return YES;
    }
    
    NSDate *nowDate = [NSDate date];
    NSDictionary *licenseDic = [MGIDCardQualityAssessment checkCachedLicense];
    
    NSDate *sdkDate = [licenseDic valueForKey:[self IDCardVersion]];
    
    MGLog(@"idCardSDK licenes:%@", sdkDate);

    if ([sdkDate compare:nowDate] == NSOrderedDescending) {
        return YES;
    }

    return NO;
}

+ (NSString *)IDCardVersion{
#if TARGET_IPHONE_SIMULATOR
    return @"1.0.0";
#else
    return [MGIDCardQualityAssessment getVersion];
#endif
}


@end
