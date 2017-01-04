package com.shudu.chaoshi;

import android.animation.Animator;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetFileDescriptor;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import com.megvii.livenesslib.view.RotaterView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by binghezhouke on 14-10-24.
 */
public class FaceLivenessResultActivity extends Activity implements View.OnClickListener {
	private TextView textView;
	private ImageView mImageView;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(com.megvii.livenesslib.R.layout.activity_result);
		init();
	}

	private void init() {
		mImageView = (ImageView) findViewById(com.megvii.livenesslib.R.id.result_status);
		textView = (TextView) findViewById(com.megvii.livenesslib.R.id.result_text_result);
		findViewById(com.megvii.livenesslib.R.id.result_next).setOnClickListener(this);
		String resultOBJ = getIntent().getStringExtra("result");

		try {
			JSONObject result = new JSONObject(resultOBJ);
			textView.setText(result.getString("result"));

			int resID = result.getInt("resultcode");
			if (resID == com.megvii.livenesslib.R.string.verify_success) {
				doPlay(com.megvii.livenesslib.R.raw.meglive_success);
			} else if (resID == com.megvii.livenesslib.R.string.liveness_detection_failed_not_video) {
				doPlay(com.megvii.livenesslib.R.raw.meglive_failed);
			} else if (resID == com.megvii.livenesslib.R.string.liveness_detection_failed_timeout) {
				doPlay(com.megvii.livenesslib.R.raw.meglive_failed);
			} else if (resID == com.megvii.livenesslib.R.string.liveness_detection_failed) {
				doPlay(com.megvii.livenesslib.R.raw.meglive_failed);
			} else {
				doPlay(com.megvii.livenesslib.R.raw.meglive_failed);
			}

			boolean isSuccess = result.getString("result").equals(
					getResources().getString(com.megvii.livenesslib.R.string.verify_success));
			mImageView.setImageResource(isSuccess ? com.megvii.livenesslib.R.drawable.result_success
					: com.megvii.livenesslib.R.drawable.result_failded);
			doRotate(isSuccess);

		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void onBackPressed() {
		super.onBackPressed();
		Intent intent = new Intent(this, FaceLivenessInitActivity.class);
		startActivity(intent);
	}

	public static void startActivity(Context context, String status) {
		Intent intent = new Intent(context, FaceLivenessResultActivity.class);
		intent.putExtra("result", status);
		context.startActivity(intent);
	}

	@Override
	public void onClick(View view) {
		int id = view.getId();
		if (id == com.megvii.livenesslib.R.id.result_next) {
			finish();
		}
	}

	private void doRotate(boolean success) {
		RotaterView rotaterView = (RotaterView) findViewById(com.megvii.livenesslib.R.id.result_rotater);
		rotaterView.setColour(success ? 0xff4ae8ab : 0xfffe8c92);
		final ImageView statusView = (ImageView) findViewById(com.megvii.livenesslib.R.id.result_status);
		statusView.setVisibility(View.INVISIBLE);
		statusView.setImageResource(success ? com.megvii.livenesslib.R.drawable.result_success
				: com.megvii.livenesslib.R.drawable.result_failded);

		ObjectAnimator objectAnimator = ObjectAnimator.ofInt(rotaterView,
				"progress", 0, 100);
		objectAnimator.setInterpolator(new AccelerateDecelerateInterpolator());
		objectAnimator.setDuration(600);
		objectAnimator.addListener(new Animator.AnimatorListener() {
			@Override
			public void onAnimationStart(Animator animation) {

			}

			@Override
			public void onAnimationEnd(Animator animation) {
				Animation scaleanimation = AnimationUtils.loadAnimation(
						FaceLivenessResultActivity.this, com.megvii.livenesslib.R.anim.scaleoutin);
				statusView.startAnimation(scaleanimation);
				statusView.setVisibility(View.VISIBLE);
			}

			@Override
			public void onAnimationCancel(Animator animation) {

			}

			@Override
			public void onAnimationRepeat(Animator animation) {

			}
		});
		objectAnimator.start();
	}

	private MediaPlayer mMediaPlayer = null;

	private void doPlay(int rawId) {
		if (mMediaPlayer == null)
			mMediaPlayer = new MediaPlayer();

		mMediaPlayer.reset();
		try {
			AssetFileDescriptor localAssetFileDescriptor = getResources()
					.openRawResourceFd(rawId);
			mMediaPlayer.setDataSource(
					localAssetFileDescriptor.getFileDescriptor(),
					localAssetFileDescriptor.getStartOffset(),
					localAssetFileDescriptor.getLength());
			mMediaPlayer.prepare();
			mMediaPlayer.start();
		} catch (Exception localIOException) {
			localIOException.printStackTrace();
		}
	}

	@Override
	protected void onDestroy() {
		super.onDestroy();
		if (mMediaPlayer != null) {
			mMediaPlayer.reset();
			mMediaPlayer.release();
		}
	}
}