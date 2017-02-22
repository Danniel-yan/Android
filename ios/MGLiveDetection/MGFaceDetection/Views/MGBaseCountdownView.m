//
//  MGBaseCountdownView.m
//  MGLivenessDetection
//
//  Created by 张英堂 on 16/4/12.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGBaseCountdownView.h"

@interface MGBaseCountdownView ()

/**
 *  倒计时定时器
 */
@property (nonatomic, strong) NSTimer *timer;

/**
 *  当前已经第几秒
 */
@property (nonatomic, assign) NSInteger tempCount;

- (void)restTimer;

@end


@implementation MGBaseCountdownView

- (instancetype)initWithFrame:(CGRect)frame{
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = [UIColor clearColor];
        [self setHidden:YES];
        
        [self creatCountDownView];
    }
    return self;
}

- (void)setMaxTime:(CGFloat)time{
    _maxTime = time;
    
    [self restTimer];
}

- (void)restTimer{
    [self.timer invalidate];
    self.timer = nil;
    
    self.tempCount = 0;
    
    [self timerChangeAndViewAnimation:_maxTime];
}

/**
 *  每次倒计时间改变，调用此方法
 */
- (void)timeChange:(NSTimer *)timer{
    CGFloat num = _maxTime - self.tempCount;
    
    [self timerChangeAndViewAnimation:num];
    self.tempCount++;
    
    if (self.tempCount == _maxTime+1) {
        [timer invalidate];
        timer = nil;
    }
}

- (void)startAnimation{
    [self setHidden:NO];
    
    if (self.timer == nil) {
        self.timer = [NSTimer timerWithTimeInterval:1
                                             target:self
                                           selector:@selector(timeChange:)
                                           userInfo:nil
                                            repeats:YES];
        
        [[NSRunLoop currentRunLoop] addTimer:self.timer forMode:NSDefaultRunLoopMode];
    }
    
    [self.timer fire];
}

- (void)stopAnimation{
    [self restTimer];
    [self setHidden:YES];
}


- (void)timerChangeAndViewAnimation:(CGFloat)lastTime{
    
}

- (void)drawRect:(CGRect)rect {
    // Drawing code
}

@end
