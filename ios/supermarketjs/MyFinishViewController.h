//
//  MyFinishViewController.h
//  MegLiveDemo
//
//  Created by 张英堂 on 16/6/15.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MGLivenessDetection/MGLivenessDetection.h>

@interface MyFinishViewController : UIViewController

@property (nonatomic, assign) BOOL checkOK;


@property (nonatomic, strong) FaceIDData *faceData;


@end
