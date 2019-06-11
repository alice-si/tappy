# Build a new version of apk for Goolge Play store

This tutorial is copied from official react-native docs and modified to work with tappy app

Android requires that all apps be digitally signed with a certificate before they can be installed. In order to distribute your Android application via [Google Play store](https://play.google.com/store) it needs to be signed with a release key that then needs to be used for all future updates. This guide covers the process in brief, as well as lists the steps required to package the JavaScript bundle.

### Keystore
You don't need to generate new keystore, just contact tappy authors and ask them for the tappy-keystore

### Setting up Gradle variables

1. Place the `tappy-keystore` file under the `app/android/app`.
2. Edit the file `app/android/gradle.properties`, and add the following.
Please note that you shold make this step only if you regenerated android foilder.
If you copied android folder from git - skip this step.

```
MYAPP_UPLOAD_STORE_FILE=tappy-keystore
MYAPP_UPLOAD_KEY_ALIAS=key0
MYAPP_UPLOAD_STORE_PASSWORD=Alice123
MYAPP_UPLOAD_KEY_PASSWORD=Alice123
```

These are going to be global Gradle variables, which we can later use in our Gradle config to sign our app.

### Adding signing config to your app's Gradle config
Please note that you shold make this step only if you regenerated android foilder.
If you copied android folder from git - skip this step.

The last configuration step that needs to be done is to setup release builds to be signed using upload key. Edit the file `android/app/build.gradle` in your project folder, and add the signing config,

```gradle
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

### Changing app and code version
Edit the file `android/app/build.gradle`. Find versionCode and versionName and increase it.

### Bundle js manually
This step is not described in official react-native docs, but it's required. Run in terminal
```sh
$ cd app
$ react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

### Remove duplicated resources
This step is not described in official react-native docs, but it's required.
Run in terminal
```sh
$ rm -r app/android/app/src/main/res/drawable-*
```

### Generating the release APK

Simply run the following in a terminal:

```sh
$ cd app/android
$ ./gradlew app:bundleRelease
```

### Testing the release build of your app

Before uploading the release build to the Play Store, make sure you test it thoroughly. First uninstall any previous version of the app you already have installed. Install it on the device using:

```sh
$ react-native run-android --variant=release
```

Note that `--variant=release` is only available if you've set up signing as described above.

You can kill any running packager instances, since all your framework and JavaScript code is bundled in the APK's assets.

### Publishing to Google Play store
Generated apk is located in `app/android/app/build/outputs/apk/release` folder.
Go to `https://play.google.com/apps/publish` and create a new release.
Please note that app version updating could take about 1 hour in Google Play store.


### Sources
- https://facebook.github.io/react-native/docs/signed-apk-android
- https://medium.com/@impaachu/react-native-android-release-build-crash-on-device-14f2c9eacf18