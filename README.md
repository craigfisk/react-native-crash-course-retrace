# Some notes on React Native basics

Apologies for the long README. In my opinion, Brad Traversy's tutorials

- Youtube: [Android SDK & AVD Setup for React Native](https://www.youtube.com/watch?v=KRLLjlpy0r4&t=19s)
- Youtube: [React Native Crash Course](https://www.youtube.com/watch?v=mkualZPRZCs&t=499s)

are great, but here I want to keep my own notes on 1) setting up a React Native development on Ubuntu Mate 16.04, and 2) on time/topic of various sections of the "React Native Crash Course," which walks through basics of various types of components.

# 1) React Native dev on Ubuntu

My desktop and laptop environments are Ubuntu Mate 16.04.2 running node.js 8.1.2 (on nvm 0.32.0).
As of 2017-7-5, React Native requires Android version 6 ("Marshmallow"), which must be added to Android Studio, but Android Studio 2.3 has deprecated or changed some of the tools needed for working with this. So here is the setup I used:

1) Install Java 8: I'm using 1.8.0_131 from Oracle's download site, configured and run using update-alternatives (`sudo update-alternatives --config java`); added paths to `/etc/bash.bashrc`).

2) Install other software that is needed, according to https://developer.android.com/studio/install.html: `sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386`

3) Install Android Studio 2.3: (downloaded 2.3.3 from here: https://developer.android.com/studio/index.html) and
followed installation instructions for Linux: https://developer.android.com/studio/install.html; and put it on `/usr/local/`):
```
cd Downloads
sudo mkdir /usr/local/android-studio
sudo unzip android-studio-ide-162.4069837-linux.zip -d /usr/local/
cd /usr/local/android-studio/bin
./studio.sh		// no sudo or it will install in /root!!
```
check the "I do not have previous version..." option

Follow general directions here: https://developer.android.com/studio/install.html and in Brad Traversy [Android SDK & AVD Setup for React Native](https://www.youtube.com/watch?v=KRLLjlpy0r4&t=19s), which uses Android Studio 2.2.3, not 2.3.3, so the UX differs somewhat. See Traversy [React Native Crash Course]( https://www.youtube.com/watch?v=mkualZPRZCs&t=499s) and the ["React Native Getting Started"](https://facebook.github.io/react-native/docs/getting-started.html) page. On the latter, use the "Building Projects with Native Code" tab; not the "Quick Start" tab.

So to review, the requirements include:

- node 6 or newer
- `npm install -g react-native-cli`
- JDK 8 or newer
- Android Studio

In the Android Studio installation, pick "custom" instead of "standard," IntelliJ (the default) UI, and for components to install: add a check for "Android Virtual Device" (we're going to get Nexus 5X API 26_x86 as a default). Note that the "Android SDK Location" is given as `/home/<user>/Android/Sdk` (that's uppercase "S" but lowercase "dk") --> next --> next --> Finish --> opens the Android 2.3.3 "Welcome to Android Studio" panel (you can use ctrl+shift+A to open a search from here).

4) Add what is needed for React Native in Android Studio 2.3.3 panel: According to https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment
"Welcome" > "configure" > "SDK Manager" > [ Appearance & Behavior > System Settings ] > Android SDK > SDK Platforms tab > check "Show Package Details" and then add:
	"Android 6.0" ("Marshmallow"). We want to have selected:

- Google APIs
- Android SDK Platform 23
- Sources for Android 23
- Intel x86 Atom_64 System Image
- Google APIs Intel x86 Atom_64 System Image
- In the SDK Tools tab > check "Show Package Details" and then add
- 23.0.1
> "Apply"

Also, confirm that `/home/<user>/Android/Sdk` is the path being used in Android Studio.

I noticed there was a command window from `./studio.sh` still open after this, with an error message about not finding `~/.android/repositories.cfg`, so I did
```
touch $HOME/.android/repositories.cfg
// edited that file to be:
### User Sources for Android SDK Manager
count=0
// based on some Googling :)
```

5) Additional tools (HAXM etc.) [skipped]

6) `PATH` additions:

Added to `/etc/bash.bashrc` (use `$HOME/.bash_profile` to restrict to you):
```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin	// avdmanager and sdkmanager are here
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
`source /etc/bash.bashrc`  // apply

7) Skipped "Watchman and "Creating a new application" sections.
Skipped Android Virtual Device section. We'll run on a Nexus 6P.
But, leaving this note for myself:
In Android Studio 23.3.3, the "android" command seen in earlier documentation is deprecated. For manual SDK, AVD, and project management, please use Android Studio.
For command-line tools, use `tools/bin/sdkmanager` and `tools/bin/avdmanager`.

8) To do develop and then run app on a phone:
See https://facebook.github.io/react-native/docs/running-on-device.html

On Android phone: \> Settings \> About phone \> Build number \> tap 7 times; now go to Settings \> Developers (new item) \> enable USB debugging

Attach phone to computer and on computer do
```
lsusb		// get first 4 of 8-digit id code for the attached phone; "18d1" here
echo SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev" | sudo tee /etc/udev/rules.d/51-android-usb.rules
// and restart `udev`
adb devices // if can't find adb, use full path to Android/Sdb/platform-tools/adb
```
If there are "unauthorized" or "permissions" problems:

```
`adb devices`
(If this returns phone ID with "no permissions")
8XV5T15A20007996	 no permissions (verify udev rules)
```
To fix this problem:

```
sudo -s  // if `sudo kill-server`, `adb devices` still "no permissions"
adb kill-server
adb start-server
```
`adb devices` now shows:

```
List of devices attached
8XV5T15A20007996	  device
```
And you are good to go. If, however, it shows "unauthorized", check on the phone for a message:
```
"Allow USB debugging?
The computer's RSA key fingerprint is ....
Always allow from this computer?
```

Check "yes". Now `adb devices` gives:

```
List of devices attached
8XV5T15A20007996	  device
```

and now the connection to the phone works. Done with installation. Yay!

# Notes on AVD creation

For reference for working with AVDs, the command is now `avdmanager`. So for example:
```
cd Android/Sdk
./tools/bin/avdmanager create avd -n nexus6P -k "system-images;android-23;google_apis;x86_64"
```
Per https://stuff.mit.edu/afs/sipb/project/android/docs/tools/devices/managing-avds-cmdline.html
```
android create avd -n <name> -t <targetID> [-<option> <value>] ...
   // get list of targetID's, do `avdmanager list targets`
```
To create an AVD would now be:

```
create avd --force --name testAVD --abi google_apis/x86_64 --package 'system-images;android-23;google_apis;x86_64'
Do you wish to create a custom hardware profile? [no] no
-rw-rw-r-- 1 <user> <user> 107 Jul  7 18:09 ./.android/avd/testAVD.ini
```

# 2) Notes on "React Native Crash Course"

Following Brad Traversy's Jan 7 2017 ["React Native Crash Course"](https://www.youtube.com/watch?v=mkualZPRZCs&t=499s) Youtube tutorial.

Assuming installation as above, next steps:
```
npm install -g react-native-cli
npm install -g yarn
react-native init myapp		// creates `myapp` directory
cd myapp
react-native start          // in this 1st terminal
react-native run-android    // in a 2nd terminal
   --> opens "Welcome to React Native" screen on the phone
   --> in that 2nd terminal, start editor and open myapp/index.android.js
react-native log-android    // in a 3rd terminal
```

Confirm that changes flow from editor to phone by changing the message text in your editor and see the resulting change on the phone.

To get hot reloading working (except sometimes with changes to state, according to Traversy):
```
adb reverse tcp:8081 tcp:8081
react-native start          // in a 1st terminal in project directory
react-native run-android    // in a 2nd terminal in project directory
// After installation is complete, open "myapp" on the phone and
// shake to get the menu to appear and enable "hot reloading"
```

This enables automatic rebuild whenever a project file is saved in the editor on the development system. Sometimes you may need to re-run `react-native run-android` to get changes effective on the phone.
```
Time  Topic
----  -----
20:30 in "React Native Crash Course" clear everything in index.android.js and start basic example of component, props, state in RN/R:
24:30 first component
26:30 on React Native/React concepts: properties, state:
```
For reference:
`myapp/app/components/Component1/Component1.js`
```
import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';

export default class Component1 extends Component{
  constructor() {
  	 super();
    this.state = {
       name: 'Craig'
    }
  }
  render(){
    return(
      <View>
        <Text>{this.props.message}</Text>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Component1', () => Component1);
```
index.android.js:
```
import React, {Component} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import Component1 from './app/components/Component1/Component1';

export default class myapp extends Component{
  render(){
    return(
      <View>
        <Component1 message='Hi there!' />
      </View>
    );
  }
}

AppRegistry.registerComponent('myapp', () => myapp);
```
```
32:00 running react-native log-android in a 2nd terminal (Traversy using VS Code)
32:45 styling: in-line styles first on Component2
34:30 more in-line styling
36:00 using StyleSheet and defining style objects
37:20 adding Flexbox basics (see Traversy's "Flexbox in 20 minutes" for more)
43:00 TouchableHightlight vs TouchableOpacity (see Docs at https://facebook.github.io/react-native/releases/next/docs/getting-started.html)
TouchableHighlight (with underlayColor)
47:00 TouchableOpacity
49:40 TextInput
52:00 enable "hot reloading"
57:00 picker, slider, switch (only demonstrating switch)
1:00:00 overview of next section: ListView and AsyncStorage [don't think he got to the latter]
1:01:30 ListView
1:09:00 fetching the data
1:15:30 adding user.email
1:16:00 [stopped here] navigation
```

Didn't finish the final part, which uses Navigator, because I got a an error that Navigator is deprecated and has been removed from this package. It can now be installed and imported from `react-native-deprecated-custom-components` instead of `react-native`. Learn about alternative navigation solutions at http://facebook.github.io/react-native/docs/navigation.html.

However, my next step will be to move on to react-navigation.
