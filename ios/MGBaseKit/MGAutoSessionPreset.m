//
//  MGAutoSessionPreset.m
//  MGBaseKit
//
//  Created by 张英堂 on 16/8/2.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGAutoSessionPreset.h"
#import "MGBaseDefine.h"

@implementation MGAutoSessionPreset


+ (NSString *)autoSessionPreset{
    
    NSString *tempSessionPreset;
    
    if (MG_WIN_WIDTH == 320 && MG_WIN_HEIGHT == 480) {
        tempSessionPreset = AVCaptureSessionPreset640x480;
    }else{
        tempSessionPreset = AVCaptureSessionPresetiFrame960x540;
    }
    
    return tempSessionPreset;
}

@end
