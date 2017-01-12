//
//  FaceMegModule.m
//  supermarket
//
//  Created by 张阳浩 on 16/12/30.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "FaceMegModule.h"
#import <MGLivenessDetection/MGLivenessDetection.h>
#import "MyViewController.h"
#import <MGIDCard/MGIDCard.h>
#import <MGBaseKit/MGBaseKit.h>
#import <MGBankCard/MGBankCard.h>
#import <MGBankCard/MGBankCardManager.h>
#import <MGBankCard/MGBankCardModel.h>
#import "AppDelegate.h"
@interface FaceMegModule()
@property (nonatomic , strong)  NSMutableArray  *imagesArry;
@property (nonatomic , strong)  NSMutableDictionary  *dataDic;
@property (nonatomic , strong)  MyViewController  *myViewController;


@end
@implementation FaceMegModule
- (NSMutableArray *)imagesArry
{
  if (!_imagesArry) {
    _imagesArry = [NSMutableArray  array];
  }
  return _imagesArry;
}
- (NSMutableDictionary *)dataDic
{
  if (!_dataDic) {
    _dataDic = [NSMutableDictionary  dictionary];
  }
  return _dataDic;
}
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(idCardVerifyFromFront:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [self idCardVerifyFromTheFront:resolve WithReject:reject];
}

RCT_EXPORT_METHOD(idCardVerifyFromBack:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [self idCardVerifyFromTheBack:resolve WithReject:reject];
}

RCT_EXPORT_METHOD(bankCardVerify:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [self bankCardTheVerify:resolve WithReject:reject];
}

RCT_EXPORT_METHOD(megLiveVerify:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  [self megLiveTest:resolve WithReject:reject];
}


#pragma mark 活体检查
- (void)megLiveTest:(RCTPromiseResolveBlock)resolver WithReject:(RCTPromiseRejectBlock)reject
{
  UIViewController*rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
  MyViewController *myVC = [[MyViewController alloc] initWithDefauleSetting];
  self.myViewController = myVC;
  UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:myVC];
  __unsafe_unretained FaceMegModule *weakSelf = self;
  
  myVC.block = ^(FaceIDData *data){
    //    [weakSelf meg]
    NSArray *imageDataArry = [data.images allValues];
    for (NSData *data in imageDataArry) {
      [weakSelf.imagesArry addObject:[weakSelf getBase64ImageStrOfIamgeData:data]];
    }
    weakSelf.dataDic[@"images"] = weakSelf.imagesArry;
    resolver(weakSelf.dataDic);
    [weakSelf.myViewController dismissViewControllerAnimated:YES completion:nil];
  };
  [rootVC presentViewController:nav animated:YES completion:nil];
  
}


#pragma mark 身份证正面识别
- (void)idCardVerifyFromTheFront:(RCTPromiseResolveBlock)resolver WithReject:(RCTPromiseRejectBlock)reject{
  __unsafe_unretained FaceMegModule *weakSelf = self;
  [weakSelf.imagesArry removeAllObjects];
  BOOL idcard = [MGIDCardManager getLicense];
  if (!idcard) {
    [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
    return;
  }
 ;
  UIViewController*rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
  MGIDCardManager *cardManager = [[MGIDCardManager alloc] init];
    [cardManager IDCardStartDetection:rootVC IdCardSide:IDCARD_SIDE_FRONT
                             finish:^(MGIDCardModel *model) {
                               [weakSelf.imagesArry addObject:[weakSelf getBase64ImageStrOfImage:[model croppedImageOfIDCard]]];
                               [weakSelf.imagesArry addObject:[weakSelf getBase64ImageStrOfImage:[model croppedImageOfPortrait]]];
                               weakSelf.dataDic[@"images"] = weakSelf.imagesArry;
                               resolver(weakSelf.dataDic);
                             }
                               errr:^(MGIDCardError) {
                                 NSError *error;
                                 reject(@"",@"识别失败",error);
                               }];
}
#pragma mark 身份证背面识别

- (void)idCardVerifyFromTheBack:(RCTPromiseResolveBlock)resolver WithReject:(RCTPromiseRejectBlock)reject{
  __unsafe_unretained FaceMegModule *weakSelf = self;
  [weakSelf.imagesArry removeAllObjects];
  BOOL idcard = [MGIDCardManager getLicense];
  if (!idcard) {
    [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
    return;
  }
  ;
  UIViewController*rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
  MGIDCardManager *cardManager = [[MGIDCardManager alloc] init];
  [cardManager IDCardStartDetection:rootVC IdCardSide:IDCARD_SIDE_BACK
                             finish:^(MGIDCardModel *model) {
                        [weakSelf.imagesArry addObject:[weakSelf getBase64ImageStrOfImage:[model croppedImageOfIDCard]]];
                        weakSelf.dataDic[@"images"] = weakSelf.imagesArry;
                               resolver(weakSelf.dataDic);
                             }
                               errr:^(MGIDCardError) {
                              NSError *error;
                              reject(@"",@"识别失败",error);
                               }];
  
}
#pragma mark 银行卡识别
- (void)bankCardTheVerify:(RCTPromiseResolveBlock)resolver WithReject:(RCTPromiseRejectBlock)reject{
#if TARGET_IPHONE_SIMULATOR
#else
  __unsafe_unretained FaceMegModule *weakSelf = self;
  [weakSelf.imagesArry removeAllObjects];
  BOOL bankcard = [MGBankCardManager getLicense];
  if (!bankcard) {
    [[[UIAlertView alloc] initWithTitle:@"提示" message:@"SDK授权失败，请检查" delegate:self cancelButtonTitle:@"完成" otherButtonTitles:nil, nil] show];
    return;
  }
  UIViewController*rootVC = [UIApplication sharedApplication].keyWindow.rootViewController;
  MGBankCardManager *cardManager = [[MGBankCardManager alloc] init];
  cardManager.viewType = MGBankCardViewCardBox;
  [cardManager CardStart:rootVC finish:^(MGBankCardModel *result) {
    [weakSelf.imagesArry addObject:[weakSelf getBase64ImageStrOfImage:result.bankCardImage]];
    weakSelf.dataDic[@"images"] = weakSelf.imagesArry;
    weakSelf.dataDic[@"value"] = result.bankCardNumber;
    resolver(weakSelf.dataDic);
  }];
#endif
}
#pragma mark 二进制转换成base64

- (NSString*)getBase64ImageStrOfIamgeData:(NSData*)image
{
  NSString *encodeImageStr = [image base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
  return encodeImageStr;

}

#pragma mark 图片转换成base64
- (NSString*)getBase64ImageStrOfImage:(UIImage*)image
{
  NSData *imageData        = UIImagePNGRepresentation(image);
  NSString *encodeImageStr = [imageData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
  return encodeImageStr;
}


@end
