//
//  MyViewController.h
//  MegLiveDemo
//
//  Created by 张英堂 on 16/6/8.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MGLivenessDetection/MGLivenessDetection.h>
typedef void (^faceDataBlock)(FaceIDData *faceData);
@interface MyViewController : MGLiveDetectViewController
@property (nonatomic , copy)  faceDataBlock  block;

@end
