//
//  MGCardBoxLayer.m
//  MGBankCard
//
//  Created by 张英堂 on 16/7/28.
//  Copyright © 2016年 megvii. All rights reserved.
//

#import "MGCardBoxLayer.h"
#import <MGBaseKit/MGBaseKit.h>

@interface MGCardBoxLayer ()

@property (nonatomic, strong) CALayer *anmationLayer;

@end

@implementation MGCardBoxLayer

-(instancetype)initWithViewType:(MGBankCardViewType)viewType{
    self = [super init];
    if (self) {
        _viewType = viewType;
        
        if (viewType == MGBankCardViewNumBox) {
            [self addSublayer:self.anmationLayer];
        }
    }
    return self;
}

-(CALayer *)anmationLayer{
    if (!_anmationLayer) {
        _anmationLayer = [CALayer layer];
        [_anmationLayer setBackgroundColor:MGColorWithRGB(74, 144, 224, 1).CGColor];
    }
    
    return _anmationLayer;
}

-(void)drawInContext:(CGContextRef)ctx{
    CGContextBeginPath(ctx);
    
    switch (self.viewType) {
        case MGBankCardViewNumBox:
        {
            CGRect lineRect = CGRectMake(CGRectGetMinX(self.cardNumRect)+10,
                                         CGRectGetHeight(self.cardNumRect)/2+CGRectGetMinY(self.cardNumRect),
                                         CGRectGetWidth(self.cardNumRect)-20,
                                         2);
            [self.anmationLayer setFrame:lineRect];
            [self drawBox:self.cardNumRect Context:ctx];
            [self drawLayerCornerFrame:self.cardNumRect Context:ctx];
        }
            break;
        case MGBankCardViewCardBox:
        {
            [self drawBox:self.cardBoxRect Context:ctx];
            [self drawRectLine:self.cardNumRect Context:ctx];
            [self drawLayerCornerFrame:self.cardBoxRect Context:ctx];

        }
            break;
        default:
            break;
    }
}

/* 开启闪动动画 */
-(void)starAnimation{
    static NSString *animationKey = @"card.opacity";
    CAAnimation *baseAnimation = [self.anmationLayer animationForKey:animationKey];
    
    if (baseAnimation == nil) {
        CABasicAnimation *animation = [MGAnimation animationWithOpacity];
        [self.anmationLayer addAnimation:animation forKey:animationKey];
    }
}

/* 关闭闪动动画 */
- (void)stopAnimation{
    [self.anmationLayer removeAllAnimations];
}

/**
 *  绘制一块区域，该区域为透明色，其余位置为半透明
 *
 *  @param box 区域
 *  @param ctx contextref
 */
- (void)drawBox:(CGRect)box Context:(CGContextRef)ctx{
    CGColorRef bgColor = CGColorCreateCopyWithAlpha([UIColor blackColor].CGColor, 0.6);
    
    CGContextSetFillColorWithColor(ctx, bgColor);
    CGContextFillRect(ctx, self.bounds);
    CGContextClearRect(ctx, box);
    
    CGColorRelease(bgColor);
}

- (void)drawRectAllLine:(CGRect)rect Context:(CGContextRef)ctx{
    CGContextSetStrokeColorWithColor(ctx, MGColorWithRGB(51, 207, 255, 1).CGColor);
    CGContextSetLineWidth(ctx, 1.0f);
    
    CGContextStrokeRect(ctx, rect);
}

- (void)drawRectLine:(CGRect)rect Context:(CGContextRef)ctx{
    
    CGContextSetStrokeColorWithColor(ctx, MGColorWithRGB(51, 207, 255, 1).CGColor);
    CGContextSetLineWidth(ctx, 1.0f);

    CGContextMoveToPoint(ctx, CGRectGetMinX(rect), CGRectGetMinY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMaxX(rect), CGRectGetMinY(rect));

    CGContextMoveToPoint(ctx, CGRectGetMinX(rect), CGRectGetMaxY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMaxX(rect), CGRectGetMaxY(rect));
    
    CGContextDrawPath(ctx, kCGPathStroke);
}

/**
 *  在一个长方形内画四个边角
 *
 *  @param ctx  CGContextRef
 *  @param rect 长方形区域
 */
- (void)drawLayerCornerFrame:(CGRect)rect Context:(CGContextRef )ctx{
    CGContextSetStrokeColorWithColor(ctx, MGColorWithRGB(51, 207, 255, 1).CGColor);
    CGContextSetLineWidth(ctx, 1.5f);

    CGFloat cHeight = 15.0f;
    CGContextMoveToPoint(ctx, CGRectGetMinX(rect), CGRectGetMinY(rect)+cHeight);
    CGContextAddLineToPoint(ctx, CGRectGetMinX(rect), CGRectGetMinY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMinX(rect)+cHeight, CGRectGetMinY(rect));
    
    CGContextMoveToPoint(ctx, CGRectGetMaxX(rect)-cHeight, CGRectGetMinY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMaxX(rect), CGRectGetMinY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMaxX(rect), CGRectGetMinY(rect)+cHeight);
    
    CGContextMoveToPoint(ctx, CGRectGetMinX(rect), CGRectGetMaxY(rect)-cHeight);
    CGContextAddLineToPoint(ctx, CGRectGetMinX(rect), CGRectGetMaxY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMinX(rect)+cHeight, CGRectGetMaxY(rect));
    
    CGContextMoveToPoint(ctx, CGRectGetMaxX(rect)-cHeight, CGRectGetMaxY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMaxX(rect), CGRectGetMaxY(rect));
    CGContextAddLineToPoint(ctx, CGRectGetMaxX(rect), CGRectGetMaxY(rect)-cHeight);
    
    CGContextDrawPath(ctx, kCGPathStroke);
}

@end
