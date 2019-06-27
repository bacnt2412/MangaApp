package com.manga;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.merryjs.PhotoViewer.MerryPhotoViewPackage;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.BV.LinearGradient.LinearGradientPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        Fresco.initialize(this);

    }

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
            new RNDeviceInfo(),
            new RNGestureHandlerPackage(),
            new ReanimatedPackage(),
            new LottiePackage(),
            new FastImageViewPackage(),
            new MerryPhotoViewPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new RealmReactPackage(),
            new RNFSPackage(),
            new AsyncStoragePackage()
            // eg. new VectorIconsPackage()
        );
    }
    
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}