## How to run mobile app?

### Go to the app folder
`cd app`

### Prerequisutes

#### [Install basic react-native tools](https://facebook.github.io/react-native/docs/getting-started.html)
- node.js and npm
- watchman
- react-native cli
- Android studio 
- adb tools

### Install dependecies
`npm install`

### Link nfc
`react-native link`

### Run the app
`react-native run-android`

## How to regenerate native android code
```
rm -rf android ios
react-native eject
react-native link
```

## To build release use the following tips
- use `./gradlew app:assembleRelease` instead of `./gradlew assembleRelease`
- https://facebook.github.io/react-native/docs/signed-apk-android
- https://medium.com/@impaachu/react-native-android-release-build-crash-on-device-14f2c9eacf18