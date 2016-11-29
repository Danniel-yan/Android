package com.dl7.myapp.utils;

import android.content.Context;
import android.os.Bundle;

import com.daimajia.slider.library.Animations.DescriptionAnimation;
import com.daimajia.slider.library.SliderLayout;
import com.daimajia.slider.library.SliderTypes.BaseSliderView;
import com.daimajia.slider.library.SliderTypes.TextSliderView;
import com.dl7.myapp.api.NewsUtils;
import com.dl7.myapp.api.bean.NewsBean;
import com.dl7.myapp.module.detail.NewsDetailActivity;
import com.dl7.myapp.module.photoset.PhotoSetActivity;
import com.dl7.myapp.module.special.SpecialActivity;

/**
 * Created by long on 2016/8/24.
 * 滑动器帮助类
 */
public final class SliderHelper {

    private static final String SLIDER_KEY = "SliderKey";

    private SliderHelper() {
        throw new RuntimeException("SliderHelper cannot be initialized!");
    }

    /**
     * 初始化广告滑动器
     *
     * @param context
     * @param sliderLayout
     * @param newsBean
     */
    public static void initAdSlider(final Context context, SliderLayout sliderLayout, NewsBean newsBean) {
        for (NewsBean.AdData adData : newsBean.getAds()) {
            TextSliderView textSliderView = new TextSliderView(context);
            // initialize a SliderLayout
            textSliderView.description(adData.getTitle())
                    .image(adData.getImgsrc())
                    .setScaleType(BaseSliderView.ScaleType.Fit)
                    .setOnSliderClickListener(new BaseSliderView.OnSliderClickListener() {
                        @Override
                        public void onSliderClick(BaseSliderView slider) {
                            if (slider.getBundle() != null) {
                                NewsBean.AdData adData = slider.getBundle().getParcelable(SLIDER_KEY);
                                if (adData != null) {
                                    if (NewsUtils.isNewsPhotoSet(adData.getTag())) {
                                        PhotoSetActivity.launch(context, adData.getUrl());
                                    } else if (NewsUtils.isNewsSpecial(adData.getTag())) {
                                        SpecialActivity.launch(context, adData.getUrl());
                                    } else {
                                        NewsDetailActivity.launch(context, adData.getUrl());
                                    }
                                }
                            }

                        }
                    });

            //add your extra information
            textSliderView.bundle(new Bundle());
            textSliderView.getBundle().putParcelable(SLIDER_KEY, adData);
            sliderLayout.addSlider(textSliderView);
        }
        sliderLayout.setPresetIndicator(SliderLayout.PresetIndicators.Right_Bottom);
        sliderLayout.setPresetTransformer(SliderLayout.Transformer.Accordion);
        sliderLayout.setCustomAnimation(new DescriptionAnimation());
        sliderLayout.setDuration(4000);
    }
}