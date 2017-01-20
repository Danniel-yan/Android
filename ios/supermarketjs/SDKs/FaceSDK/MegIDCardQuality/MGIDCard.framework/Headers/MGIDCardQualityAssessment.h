//
//  MGIDCardQualityAssessment.h
//  MGIDCardQualityAssessment
//
//  Created by yangmu on 15/8/3.
//  Copyright (c) 2015 Megvii. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <MGBaseKit/MGBaseKit.h>

extern NSString* const MGIDCardQualityAssessmentModelPath;
extern NSString* const MGIDCardQualityAssessmentModelRawData;

typedef enum MGIDCardSide {
    IDCARD_SIDE_FRONT = 0,
    IDCARD_SIDE_BACK = 1
} MGIDCardSide;

typedef enum MGIDCardFailedType {
    QUALITY_FAILED_TYPE_NONE = 0,
    QUALITY_FAILED_TYPE_NOIDCARD,   //1
    QUALITY_FAILED_TYPE_WRONGSIDE,
    QUALITY_FAILED_TYPE_TILT,//3
    QUALITY_FAILED_TYPE_BLUR,
    QUALITY_FAILED_TYPE_SIZETOOSMALL,//5
    QUALITY_FAILED_TYPE_SIZETOOLARGE,
    QUALITY_FAILED_TYPE_SPECULARHIGHLIGHT,//7
    QUALITY_FAILED_TYPE_OUTSIDETHEROI,
    QUALITY_FAILED_TYPE_BRIGHTNESSTOOHIGH,//9
    QUALITY_FAILED_TYPE_BRIGHTNESSTOOLOW,
    QUALITY_FAILED_TYPE_FAKE,//11
    QUALITY_FAILED_TYPE_SHADOW
} MGIDCardFailedType;

typedef enum MGIDCardType {
    IDCARD_TYPE_NORMAL,
    IDCARD_TYPE_MONGOL
} MGIDCardType;

struct MGIDCardAttr {
    float low_quality = 0;
	/*!
     * Four corner of the idcard in the image.
     * point order: top-left, top-right, bottom-right, bottom-left
     */
    CGPoint corner_points[4];
    /*!
     * Where the portrait image lies. meaningful only when it is front side
     * point order: top-left, top-right, bottom-right, bottom-left
     */
    CGPoint portrait_points[4];
    /** x(yaw), y(pitch), z(roll) rotation angles, in radian */
    float angles[3];
    bool has_specular_highlight;
    /** 0 for front, 1 for back */
    MGIDCardSide side;
    
    float brightness;
    bool has_shadow;
    MGIDCardType idcard_type;
    
    bool legality;
};

@interface MGIDCardQualityResult : NSObject

@property (readonly) MGIDCardAttr attr;
@property (readonly) NSArray *fails;
@property (readonly) UIImage *image;

-(BOOL) isValid;

-(UIImage*) croppedImageOfIDCard;
-(UIImage*) croppedImageOfIDCardWithMaxSize: (int)maxSize;
-(UIImage*) croppedImageOfPortrait;
-(UIImage*) croppedImageOfPortraitWithMaxSize: (int)maxSize;
-(NSData*) getImageDataWithMaxSize:(int)maxSize isPortrait: (bool)isPortrait andJPEGCompressionQuality: (CGFloat)jpegQuality andNeedEncrypt:(bool)encrypt andNeedWatermark:(bool)watermark andCode:(int) code;

@end

@interface MGIDCardQualityAssessment : NSObject<LicenseProtocolDelegate>

+(MGIDCardQualityAssessment*) assessmentOfOptions: (NSDictionary*) options;

-(MGIDCardQualityResult*) getQualityWithImage: (UIImage*) image side:(MGIDCardSide)side;
-(MGIDCardQualityResult*) getQualityWithImage: (UIImage*) image side:(MGIDCardSide)side ROI:(CGRect)ROI;

+(NSString*) getVersion;

@end
