//
//  MGVideoManager.m
//  MGLivenessDetection
//
//  Created by 张英堂 on 16/3/31.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGVideoManager.h"
#import "MGMovieRecorder.h"
#import <CoreMedia/CoreMedia.h>
#import <MGBaseKit/MGBaseKit.h>


@interface MGVideoManager ()<AVCaptureVideoDataOutputSampleBufferDelegate, AVCaptureAudioDataOutputSampleBufferDelegate, MovieRecorderDelegate>
{
    AVCaptureConnection *_audioConnection;
    AVCaptureConnection *_videoConnection;
    NSDictionary *_audioCompressionSettings;

    BOOL _startRecord;  //开始录像

    NSString *_tempVideoPath;
}
@property(nonatomic, assign) CMFormatDescriptionRef outputAudioFormatDescription;
@property (nonatomic, strong) AVCaptureVideoPreviewLayer *videoPreviewLayer;
@property(nonatomic, copy) NSString *sessionPreset;

@property (nonatomic, strong) MGMovieRecorder *movieRecorder;

@property (nonatomic, assign) BOOL videoRecord;
@property (nonatomic, assign) BOOL videoSound;

@end

@implementation MGVideoManager

-(void)dealloc{
    _videoSession = nil;
    _videoManagerBlock = nil;
    _movieRecorder = nil;
}

-(instancetype)initWithPreset:(NSString *)sessionPreset
               devicePosition:(AVCaptureDevicePosition)devicePosition
                  videoRecord:(BOOL)record
                   videoSound:(BOOL)sound{
    self = [super init];
    if (self) {
        _startRecord = NO;
        _devicePosition = devicePosition;

        self.sessionPreset = sessionPreset;
        self.videoRecord = record;
        self.videoSound = sound;
        
        [self initialSession];
    }
    return self;
}
+ (instancetype)videoPreset:(NSString *)sessionPreset
             devicePosition:(AVCaptureDevicePosition)devicePosition
                videoRecord:(BOOL)record
                 videoSound:(BOOL)sound{
    
    MGVideoManager *manager = [[MGVideoManager alloc] initWithPreset:sessionPreset
                                                      devicePosition:devicePosition
                                                         videoRecord:record
                                                          videoSound:sound];
    return manager;
}

#pragma mark - video 功能开关
- (void)stopRunning{
    if (self.movieRecorder.status == MovieRecorderStatusRecording) {
        MGLog(@"请在关闭视频流之前关闭录像器，--stopRceording");
        [self stopRceording];
    }
    
    if (self.videoSession) {
        [self.videoSession stopRunning];
    }
}
- (void)startRunning{
    if (self.videoSession) {
        [self.videoSession startRunning];
    }
}
- (void)startRecording{
    
    [self startRunning];
    
    if (!self.videoRecord) {
        return;
    }
    _startRecord = YES;
}

- (NSString *)stopRceording{
    _startRecord = NO;
    
    if (self.movieRecorder) {
        if (self.movieRecorder.status == MovieRecorderStatusRecording) {
            [self.movieRecorder finishRecording];
        }
        self.movieRecorder = nil;
    }
    
    NSString *tempString = _tempVideoPath ? _tempVideoPath :@"no video!";
    return tempString;
}

#pragma mark - 初始化video配置
- (NSString *)sessionPreset{
    if (nil == _sessionPreset) {
        _sessionPreset = AVCaptureSessionPreset640x480;
    }
    return _sessionPreset;
}
-(AVCaptureVideoPreviewLayer *)videoPreviewLayer{
    if (nil == _videoPreviewLayer) {
        _videoPreviewLayer = [[AVCaptureVideoPreviewLayer alloc] initWithSession:self.videoSession];
        [_videoPreviewLayer setFrame:CGRectMake(0, 0, MG_WIN_WIDTH, MG_WIN_HEIGHT)];
        [_videoPreviewLayer setVideoGravity:AVLayerVideoGravityResizeAspectFill];
    }
    return _videoPreviewLayer;
}

-(AVCaptureVideoPreviewLayer *)videoPreview{
    return self.videoPreviewLayer;
}
-(BOOL)videoSound{
    if (_videoRecord && _videoSound) {
        return YES;
    }
    return NO;
}

//初始化相机
- (void) initialSession
{
    _videoSession = [[AVCaptureSession alloc] init];
    self.videoSession.sessionPreset = self.sessionPreset;
    /*--> 视频*/
    _videoInput = [[AVCaptureDeviceInput alloc] initWithDevice:[self cameraWithPosition:self.devicePosition] error:nil];
    if ([self.videoSession canAddInput:self.videoInput]) {
        [self.videoSession addInput:self.videoInput];
    }
    AVCaptureVideoDataOutput *output = [[AVCaptureVideoDataOutput alloc] init];
    if ([self.videoSession canAddOutput:output]) {
        [self.videoSession addOutput:output];
    }
    _videoConnection = [output connectionWithMediaType:AVMediaTypeVideo];
    self.videoOrientation = _videoConnection.videoOrientation;
    
    dispatch_queue_t queue = dispatch_queue_create("com.megvii.face.video", NULL);
    [output setSampleBufferDelegate:self queue:queue];
    
    output.videoSettings =[NSDictionary dictionaryWithObject:[NSNumber numberWithInt:kCVPixelFormatType_32BGRA]
                                                      forKey:(id)kCVPixelBufferPixelFormatTypeKey];
    
    if (self.videoSound) {
        AVCaptureDevice *audioDevice = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeAudio];
        AVCaptureDeviceInput *audioIn = [[AVCaptureDeviceInput alloc] initWithDevice:audioDevice error:nil];
        if ( [self.videoSession canAddInput:audioIn] ) {
            [self.videoSession addInput:audioIn];
        }
        
        AVCaptureAudioDataOutput *audioOut = [[AVCaptureAudioDataOutput alloc] init];
        dispatch_queue_t audioCaptureQueue = dispatch_queue_create("com.megvii.audio", DISPATCH_QUEUE_SERIAL );
        [audioOut setSampleBufferDelegate:self queue:audioCaptureQueue];
        
        if ( [self.videoSession canAddOutput:audioOut] ) {
            [self.videoSession addOutput:audioOut];
        }
        _audioConnection = [audioOut connectionWithMediaType:AVMediaTypeAudio];
        output.alwaysDiscardsLateVideoFrames = YES;
        
        _audioCompressionSettings = [[audioOut recommendedAudioSettingsForAssetWriterWithOutputFileType:AVFileTypeQuickTimeMovie] copy];
    }
}

- (void)initVideoRecord:(CMFormatDescriptionRef)formatDescription{
    if (self.movieRecorder == nil) {
        NSString *moveName = [NSString stringWithFormat:@"megvii_%@.mov", [[NSDate date] description]];
        _tempVideoPath = [NSString pathWithComponents:@[NSTemporaryDirectory(), moveName]];
        NSURL *url = [[NSURL alloc] initFileURLWithPath:_tempVideoPath];
        
        self.movieRecorder = [[MGMovieRecorder alloc] initWithURL:url];
        
        CGAffineTransform videoTransform = [self transformFromVideoBufferOrientationToOrientation:(AVCaptureVideoOrientation)UIDeviceOrientationPortrait withAutoMirroring:NO];
        
        [self.movieRecorder addVideoTrackWithSourceFormatDescription:formatDescription
                                                           transform:videoTransform
                                                            settings:nil];
        
        dispatch_queue_t callbackQueue = dispatch_queue_create("com.megvii.recordercallback", DISPATCH_QUEUE_SERIAL);
        [self.movieRecorder setDelegate:self callbackQueue:callbackQueue];
        
        if (self.videoSound) {
            [self.movieRecorder addAudioTrackWithSourceFormatDescription:self.outputAudioFormatDescription settings:_audioCompressionSettings];
        }
    }
}

//前后摄像头
- (AVCaptureDevice *)cameraWithPosition:(AVCaptureDevicePosition) position {
    NSArray *devices = [AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo];
    for (AVCaptureDevice *device in devices) {
        if ([device position] == position) {
            return device;
        }
    }
    return nil;
}
//前后摄像头的切换
- (void)toggleCamera:(id)sender{
    NSUInteger cameraCount = [[AVCaptureDevice devicesWithMediaType:AVMediaTypeVideo] count];
    if (cameraCount > 1) {
        NSError *error;
        AVCaptureDeviceInput *newVideoInput;
        AVCaptureDevicePosition position = [[_videoInput device] position];
        
        if (position == AVCaptureDevicePositionBack)
            newVideoInput = [[AVCaptureDeviceInput alloc] initWithDevice:[self cameraWithPosition:AVCaptureDevicePositionFront] error:&error];
        else if (position == AVCaptureDevicePositionFront)
            newVideoInput = [[AVCaptureDeviceInput alloc] initWithDevice:[self cameraWithPosition:AVCaptureDevicePositionBack] error:&error];
        else
            return;
        
        if (newVideoInput != nil) {
            [self.videoSession beginConfiguration];
            [self.videoSession removeInput:self.videoInput];
            if ([self.videoSession canAddInput:newVideoInput]) {
                [self.videoSession addInput:newVideoInput];
                _videoInput = newVideoInput;
            } else {
                [self.videoSession addInput:self.videoInput];
            }
            [self.videoSession commitConfiguration];
        } else if (error) {
            NSLog(@"toggle carema failed, error = %@", error);
        }
    }
}

//录像功能
- (void)appendVideoBuffer:(CMSampleBufferRef)pixelBuffer
{
    @synchronized(self){
        if (_startRecord == YES) {
            if (self.movieRecorder == nil) {
                CMFormatDescriptionRef formatDescription = CMSampleBufferGetFormatDescription(pixelBuffer);
                
                [self initVideoRecord:formatDescription];
                [self.movieRecorder prepareToRecord];
            }
            [self.movieRecorder appendVideoSampleBuffer:pixelBuffer];
        }
    }
}

- (void)appendAudioBuffer:(CMSampleBufferRef)sampleBuffer{
    if (self.videoSound) {
        
        if (!self.outputAudioFormatDescription) {
            CMFormatDescriptionRef formatDescription = CMSampleBufferGetFormatDescription(sampleBuffer);
            self.outputAudioFormatDescription = formatDescription;
        }
        
        if (!self.movieRecorder) {
            return;
        }
        @synchronized(self){
            [self.movieRecorder appendAudioSampleBuffer:sampleBuffer];
        }
    }
}

- (CGAffineTransform)transformFromVideoBufferOrientationToOrientation:(AVCaptureVideoOrientation)orientation withAutoMirroring:(BOOL)mirror
{
    CGAffineTransform transform = CGAffineTransformIdentity;
    
    CGFloat orientationAngleOffset = MGAngleOffsetFromPortraitOrientationToOrientation(orientation);
    CGFloat videoOrientationAngleOffset = MGAngleOffsetFromPortraitOrientationToOrientation(self.videoOrientation);
    
    CGFloat angleOffset = orientationAngleOffset - videoOrientationAngleOffset;
    transform = CGAffineTransformMakeRotation(angleOffset);
    transform = CGAffineTransformRotate(transform, -M_PI);
    
    return transform;
}

#pragma mark - delegate
- (void)captureOutput:(AVCaptureOutput *)captureOutput
didOutputSampleBuffer:(CMSampleBufferRef)sampleBuffer
       fromConnection:(AVCaptureConnection *)connection
{
    @autoreleasepool {
        if (connection == _videoConnection)
        {
            if (self.videoRecord && _startRecord) {
                [self appendVideoBuffer:sampleBuffer];
            }
            
            if (self.videoManagerBlock && self) {
                self.videoManagerBlock(captureOutput, sampleBuffer, connection);
            }
            
            if (self.videoDelegate && self) {
                [self.videoDelegate MGCaptureOutput:captureOutput didOutputSampleBuffer:sampleBuffer fromConnection:connection];
            }
            
        }else if (connection == _audioConnection){
            [self appendAudioBuffer:sampleBuffer];
        }
    }
}

#pragma mark - recorder delegate
- (void)movieRecorder:(MGMovieRecorder *)recorder didFailWithError:(NSError *)error{
    MGLog(@"Recorder error:%@", error);
}
- (void)movieRecorderDidFinishPreparing:(MGMovieRecorder *)recorder{
    MGLog(@"Recorder Preparing");
}
-(void)movieRecorderDidFinishRecording:(MGMovieRecorder *)recorder{
    MGLog(@"Recorder finish");
}

@end
