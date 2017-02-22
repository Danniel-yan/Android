//
//  IDCardCheckVC.m
//  BankCardTest
//
//  Created by 张英堂 on 15/12/1.
//  Copyright © 2015年 megvii. All rights reserved.
//

#import "MGBankCardCheckVC.h"
#import "MGBankCardResult.h"
#import "MGBankCardBundle.h"
#import "MGBankCardConfig.h"
#import "MGBankCardModel.h"

#import <MGBaseKit/MGBaseKit.h>
#import <CoreText/CoreText.h>

#define KLeftOffset 15
#define KDownOfset 20

@interface MGBankCardCheckVC ()<UITextFieldDelegate>

@property (strong, nonatomic) UILabel *titleView;
@property (strong, nonatomic) UILabel *messageView;
@property (strong, nonatomic) UIButton *sureView;
@property (strong, nonatomic) UIImageView *cardImageView;
@property (nonatomic, strong) UIView *cardBottomView;

@property (nonatomic, strong) NSMutableArray *textFieldArray;
@property (nonatomic, strong) NSMutableArray *sizeCountArray;


@end


@implementation MGBankCardCheckVC
-(void)dealloc{
    if (self.debug) {
        MGLog(@"%s dealloc", __func__);
    }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self creatView];
}

- (void)creatView{
    [self.view setBackgroundColor:[UIColor whiteColor]];
    self.title = [MGBankCardBundle MGBundleString:@"title_check_cardNum"];
    self.textFieldArray = [NSMutableArray arrayWithCapacity:3];
    
    self.titleView = [[UILabel alloc] initWithFrame:CGRectMake(KLeftOffset, 30, MG_WIN_WIDTH-KLeftOffset*2, 40)];
    [self.titleView setTextAlignment:NSTextAlignmentCenter];
    [self.titleView setFont:[UIFont systemFontOfSize:21]];
    [self.titleView setTextColor:MGColorWithRGB(100, 103, 107, 1)];
    [self.titleView setText:[MGBankCardBundle MGBundleString:@"title_check_label"]];
    [self.view addSubview:self.titleView];
    
    self.cardImageView = [[UIImageView alloc] initWithFrame:CGRectMake(KLeftOffset, CGRectGetMaxY(self.titleView.frame)+KDownOfset, MG_WIN_WIDTH-KLeftOffset*2, (MG_WIN_WIDTH-KLeftOffset*2)/408*108)];
    [self.cardImageView setClipsToBounds:YES];
    [self.cardImageView setContentMode:UIViewContentModeScaleAspectFit];
    [self.view addSubview:self.cardImageView];

    self.cardBottomView = [[UIView alloc] initWithFrame:CGRectMake(KLeftOffset, CGRectGetMaxY(self.cardImageView.frame)+KDownOfset, MG_WIN_WIDTH-KLeftOffset*2, 50)];
    [self.cardBottomView setBackgroundColor:MGColorWithRGB(51, 56, 70, 1)];
    self.cardBottomView.layer.cornerRadius = 2.0f;
    [self.cardBottomView setClipsToBounds:YES];
    [self.view addSubview:self.cardBottomView];

    self.messageView = [[UILabel alloc] initWithFrame:CGRectMake(KLeftOffset, CGRectGetMaxY(self.cardBottomView.frame)+KDownOfset, MG_WIN_WIDTH-KLeftOffset*2, 60)];
    [self.messageView setTextAlignment:NSTextAlignmentCenter];
    [self.messageView setNumberOfLines:0];
    [self.messageView setFont:[UIFont systemFontOfSize:19]];
    [self.messageView setTextColor:MGColorWithRGB(112, 114, 115, 1)];
    [self.messageView setText:[MGBankCardBundle MGBundleString:@"title_check_message"]];
    [self.view addSubview:self.messageView];
    
    self.sureView = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.sureView setFrame:CGRectMake(MG_WIN_WIDTH/3/2, CGRectGetMaxY(self.messageView.frame)+KDownOfset, MG_WIN_WIDTH/3*2, 50)];
    [self.sureView setTitle:[MGBankCardBundle MGBundleString:@"title_btn_OK"] forState:UIControlStateNormal];
    [self.sureView setBackgroundColor:MGColorWithRGB(98, 145, 234, 1)];
    [self.sureView setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.sureView.layer.cornerRadius = 2.0f;
    [self.sureView setClipsToBounds:YES];
    [self.sureView addTarget:self action:@selector(OKFinishAction:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:self.sureView];
    
    
    self.cardImageView.image = self.cardResult.bankCardImage;
    NSArray *stringArray = [self.cardResult.bankCardNumber componentsSeparatedByString:@" "];
    
    self.sizeCountArray = [NSMutableArray arrayWithCapacity:4];
    
    __block NSInteger cardNumLeng = 0;
    [stringArray enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        cardNumLeng = cardNumLeng + obj.length;
        [self.sizeCountArray addObject:@(obj.length)];
    }];
    
    [self creatTextFile:stringArray maxLength:cardNumLeng];
}

//检测完成，返回结果
- (void)OKFinishAction:(id)sender {
    [self.view endEditing:YES];
    
    __block NSString *tempString = @"";
    [self.textFieldArray enumerateObjectsUsingBlock:^(UITextField * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        tempString = [tempString stringByAppendingString:obj.text];
    }];
    
    self.cardResult.bankCardNumber = tempString;
    
    if (self.finishBlock) {
        self.finishBlock(self.cardResult);
    }
    
    [self.navigationController dismissViewControllerAnimated:YES completion:nil];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark -
- (UITextField *)creatTextFile:(NSArray *)stringArray maxLength:(NSInteger)length{
    __block CGFloat nowOffset = 0;
    __block CGFloat maxWindth = self.cardBottomView.frame.size.width;
    __block CGFloat textViewY = CGRectGetMaxY(self.cardImageView.frame)+KDownOfset;
    
    [stringArray enumerateObjectsUsingBlock:^(NSString * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        NSInteger nowLength = obj.length;
        
        CGFloat width = maxWindth * (nowLength / (float)length);
        CGRect textFieldRect = CGRectMake(nowOffset+ KLeftOffset,
                                          textViewY,
                                          width,
                                          50);
        
        UITextField *textField = [[UITextField alloc] initWithFrame:textFieldRect];
        [textField setTextColor:MGColorWithRGB(255, 255, 255, 1)];
        [textField setTextAlignment:NSTextAlignmentLeft];
        [textField setFont:[UIFont systemFontOfSize:22]];
        [textField setBorderStyle:UITextBorderStyleNone];
        [textField setTextAlignment:NSTextAlignmentCenter];
        [textField setBorderStyle:UITextBorderStyleNone];
        [textField setText:obj];
        [textField setKeyboardType:UIKeyboardTypeNumberPad];
        [textField setBackgroundColor:[UIColor clearColor]];
        [textField setDelegate:self];
        [self.view addSubview:textField];
        [textField setTag:idx];
        
        [self.textFieldArray addObject:textField];
        
        nowOffset = width + nowOffset;
    }];
    return nil;
}



#pragma mark -
- (BOOL)textFieldShouldEndEditing:(UITextField *)textField{

    return YES;
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField{
    [textField resignFirstResponder];
    
    return YES;
}

-(BOOL)textFieldShouldClear:(UITextField *)textField{
    
    return YES;
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string{
    return YES;
}

#pragma mark-
-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
    [self.view endEditing:YES];
}



@end




