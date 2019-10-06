---
layout:     post
title:      "libimobiledevice与ideviceinstaller使用"
subtitle: ""
date:       2018-04-10 12:00:00
author:     "Mage"
header-img: "img/post-bg-universe.jpg"
tags:
    - ios
---

## libimobiledevice ##
相信做安卓开发的同学对android开发时的logcat印象很深，可以查看手机应用运行时的实时log输出，但做ios开发时就想有没有这么好的工具呢，其实ios下的logcat已经被大神们通过反向usb数据获取apple的接口做出来了。这就是libimobiledevice.

源码:[https://github.com/libimobiledevice/libimobiledevice][1]

可以使用brew来安装
brew install libimobiledevice
在ios 10和xcode8时，使用libimobiledevice中的ideviceinfo或者idevicesyslog时会出现
```Makefile
ERROR: Could not start service com.apple.syslog_relay.
```
这时可以执行 
```Makefile
sudo chmod 777 /var/db/lockdown
```
然后问题可以解决，如果是作了ios10和xcode8的升级后出现的错误，这时候可以用
```Makefile
brew reinstall --HEAD libimobiledevice
```
再重装一下libimobiledevice.之后再运行
```Makefile
sudo chmod 777 /var/db/lockdown
```
若出现以下报错提示：
```Makefile
Error: Cannot write to /usr/local/Cellar
```
处理方案,先执行：
```Makefile
sudo chown -R $USER /usr/local 
```
libimobiledevice查看log的方法:
连上你的ios设备，在终端下输入命令：
```Makefile
idevicesyslog
```

## ideviceinstaller ##

对于android，我们在安装apk时可以使用adb命令行来安装，那ios是不是也有同样的工具，答案也是肯定的，ios下有ideviceinstaller.

源码:[https://github.com/libimobiledevice/ideviceinstaller] [2]

同样可以使用brew来安装:
```Makefile
brew install ideviceinstaller
```
使用方法
```Makefile
ideviceinstaller -i appname.ipa
```
 
转载请注明出处:[http://woodcol.com] [3]


[1]:https://github.com/libimobiledevice/libimobiledevice
[2]:https://github.com/libimobiledevice/ideviceinstaller
[3]:http://woodcol.com
