---
layout:     post
title:      "关于Mac下动态库路径问题总结"
subtitle: ""
date:       2019-02-14 00:54:00
author:     "Mage"
header-img: "img/post-bg-universe.jpg"
tags:
    - Mac OS
---

## Mac系统动态库问题描述

现在假如有一个app应用canrunfile.app，他引用了一个/usr/lib下的系统库/usr/lib/libs.1.dylib，还引用了一个第三方库"libA.1.dylib".再假如这个libA.1.dylib动态库又引用了另一个第三方的动态库libB.2.dylib.

首先canrunfile.app在Mac系统下其实是一个目录，内部目录结构是:
```C
canrunfile.app
    /Contents
         /Frameworks
              /这里没有文件
         /MacOS
              /canrunfile              // 这是可执行的二进制程序
        /Resources
              /canrunfile.icns      //应用程序的图标文件
        /Info.plist                       //plist应用程序的说明文件
```
现在假如应用和三个动态库文件的路径在系统中安装的位置分别为:
``` bash
~/Documents/canrunfile.app
/usr/lib/libS.1.dylib
/usr/local/lib/A/libA.1.dylib
/usr/local/lib/B/libB.2.dylib
```
这种情况在开发电脑上程序可以运行的很好，但把程序打包发给别人使用的时候，因为别人的电脑上没有安装最后的两个第三方动态库，程序运行时就会报动态库加载错误。

查看这种动态库错误的方法是右键canrunlife.app然后进入到MacOS目录下双击运行二进制可执行文件，就可以看到程序运行时具体的错误是什么。

##  install_name_tool和otool工具说明

Mac系统下的app和dylib动太库引用的第三方动态库需要手动设置引用的库路径，用的工具就是install_name_tool

查看一个可执行文件或者动态库引用的第三方库路径则使用的工具是otool

对于上边的例子，我们查看canrunfile二进制文件引用的库路径
```
cd ~/Documents/canrunfile.app/MacOS
otool -L canrunfile
```
运行上边命令后可以看到:
```bash
 canrunfile:
  /usr/lib/libS.1.dylib  (compatibility version , current version)
  /usr/local/lib/libA.1.dylib (compatibility version , current version)
```
这说明canrunfile可执行程序引用了上边的两个库
这时候我们把第三方库和第三方库引用的库都复制出来放到Frameworks目录下，然使用install_name_tool修改canrunfile中的动态库引用路径
``` bash
install_name_install -change /usr/local/lib/libA.1.dylib @executable_path/../Frameworks/libA.1.dylib canrunfile
```
再运行
```bash
otool -L canrunfile
```
会看到
```bash
canrunfile:
  /usr/lib/libS.1.dylib  (compatibility version , current version)
  @executable_path/../Frameworks/libA.1.dylib (compatibility version , current version)
```
这时canrunfile的动态库引用就改好了，如果不修改
```bash
Frameworks/LibA.1.dylib
```
的引用路径就会报加载/usr/local/lib/libB.1.dylib错误
查看动态库引用的第三方动态库的方法也是
``` bash
otool -L LibA.1.dylib
```
可以看到
```bash
LibA.1.dylib:
    /usr/local/lib/libA.1.dylib
    /usr/local/lib/libB.1.dylib
```
注意，这里为什么会有两个呢，其实这里的第一个是这个动态库的安装名称，也叫INSTALL Name，这个安装名称都是使用动态库路径表示的.后边的才是这个动态库引用到的第三方库。
所以，修改第三方库引用路径的时候，还要修改这个install name.
使用install_name_tool 的id参数来修改这个install name：
```bash
cd ~/Documents/canrunfile.app/Frameworks
sudo install_name_tool -id @executable_path/../Frameworks/libA.1.dylib libA.1.dylib
```
注意，这里要加上sudo，要不然会出现权限错误问题，同时修改第三方库加载路径：
```bash
sudo install_name_tool -change  /usr/local/lib/libB.1.dylib @executable_path/../Frameworks/libB.1.dylib libA.1.dylib
```
到这里第二个动态库就修改完成了，接下来还要修改第三个库的install name（这里不修改install name不能不程序能不能运行，我没有试过，大家可以试一下）。
```bash
sudo install_name_tool -id @executable_path/../Frameworks/libB.1.dylib libB.1.dylib
```
到些动态库修改完成

## 最后的目录结构

```C
canrunfile.app
    /Contents
         /Frameworks
              /libA.1.dylib
              /libB.1.dylib
         /MacOS
              /canrunfile              // 这是可执行的二进制程序
        /Resources
              /canrunfile.icns      //应用程序的图标文件
        /Info.plist                       //plist应用程序的说明文件
```

## 参考
[https://www.suninf.net/2015/06/xcode-build-and-paths-config.html](https://www.suninf.net/2015/06/xcode-build-and-paths-config.html)