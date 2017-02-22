//
//  MGFaceBundle.m
//  MGFaceDetection
//
//  Created by 张英堂 on 15/12/23.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import "MGLiveBundle.h"

static NSString *const FaceBundleKey = @"MGLiveResource.bundle";
static NSString *const FaceBundleName = @"MGLiveResource";
static NSString *const FaceBundleType = @"bundle";
static NSString *const FaceStringKey = @"MGFaceDetection";


@implementation MGLiveBundle

+ (NSString *)LivePathForResource:(NSString *)name ofType:(NSString *)type{
    
    MGBundleDirectory tempDirectory = MGBundleMain;
    if ([type isEqualToString:@"mp3"]) {
        tempDirectory = MGBundleAudio;
    }else if([type isEqualToString:@"png"]){
        tempDirectory = MGBundleImage;
    }
    
    return [self LivePathForResource:name ofType:type inDirectory:tempDirectory];
}

+ (NSString *)LivePathForResource:(NSString *)name ofType:(NSString *)type inDirectory:(MGBundleDirectory)Directory{
    
    NSString *fileName = nil;
    switch (Directory) {
        case MGBundleImage:
        {
            fileName = @"image";
        }
            break;
        case MGBundleAudio:
        {
            fileName = @"audio";
        }
            break;
        default:
            break;
    }
    
    NSString *bundlePath = fileName ? [FaceBundleKey stringByAppendingPathComponent:fileName] : FaceBundleKey;
    NSString *tempPath = [[NSBundle mainBundle] pathForResource:name ofType:type inDirectory:bundlePath];
    
    return tempPath;
}

+ (NSString *)LiveBundleString:(NSString *)key{
    NSBundle *mgBundel = [NSBundle bundleWithPath:[[NSBundle mainBundle] pathForResource:FaceBundleName ofType:FaceBundleType]];
    
    NSString *testString = NSLocalizedStringFromTableInBundle(key, FaceStringKey, mgBundel, nil);
    return testString;
}


+ (UIImage *)LiveImageWithName:(NSString *)name{
    NSString *imagePath = [MGLiveBundle LivePathForResource:name ofType:@"png" inDirectory:MGBundleImage];
    UIImage *image = [UIImage imageWithContentsOfFile:imagePath];
    
    return image;
}


@end
