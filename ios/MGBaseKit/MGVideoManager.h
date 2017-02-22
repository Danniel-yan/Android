//
//  MGVideoManager.h
//  MGLivenessDetection
//
//  Created by 张英堂 on 16/3/31.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "MGBaseDefine.h"

@protocol MGVideoDelegate;

/**
 *  视频流管理器
 */
@interface MGVideoManager : NSObject

/**
 *  初始化方法
 *
 *  @param sessionPreset 相机分辨率 如果设置为空，则默认为 AVCaptureSessionPreset640x480
 *  @param devicePosition 前置或者后置相机，则默认为 前置相机
 *  @param record 是否录像
 *  @param sound  是否录音，必须在录像模式下设置 yes 才有用
 *  @return 实例化对象
 */
+ (instancetype)videoPreset:(NSString *)sessionPreset
             devicePosition:(AVCaptureDevicePosition)devicePosition
                videoRecord:(BOOL)record
                 videoSound:(BOOL)sound;

/**
 *  视频流的返回block， 不推荐使用。
 */
@property (nonatomic, copy) videoOutputBlock videoManagerBlock DEPRECATED_ATTRIBUTE;


/** 代理方式 返回视频流信息  */
@property (nonatomic, assign) id<MGVideoDelegate> videoDelegate;


/**
 *  视频流的预览layer 默认全屏大小
 *
 *  @return 实例化对象
 */
-(AVCaptureVideoPreviewLayer *)videoPreview;


@property (nonatomic, strong, readonly) AVCaptureSession *videoSession;
@property (nonatomic, strong, readonly) AVCaptureDeviceInput *videoInput;
@property (nonatomic, assign, readonly) AVCaptureDevicePosition devicePosition;

/**
 *  视频流的方向
 */
@property(nonatomic, assign) AVCaptureVideoOrientation videoOrientation;

/**
 *  开启视频流
 */
- (void)startRunning;

/**
 *  关闭视频流 -- 如果录像器没有停止，会自动停止录像
 */
- (void)stopRunning;

/**
 *  开始录像 --如果视频流没有开启，会自动开启。
 */
- (void)startRecording;

/**
 *  关闭录像
 *
 *  @return 录像存放地址
 */
- (NSString *)stopRceording;




@end


@protocol MGVideoDelegate <NSObject>

- (void)MGCaptureOutput:(AVCaptureOutput *)captureOutput
  didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer
         fromConnection:(AVCaptureConnection *)connection;

@end
