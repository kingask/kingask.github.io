---
layout:     post
title:      "使用chrome对nodejs和pomelo断点调试"
subtitle:   ""
date:       2018-04-10 12:00:00
author:     "Mage"
header-img: "img/post-bg-universe.jpg"
tags:
    - nodejs
---
###pomelo开始断点调试要作的
我们使用浏览器来对pomelo进行断点调试，node版本更很快，调试命令也变化的比较快。pomelo又是一个多进程的服务器框架，用webStorm或者VSCode调试发现子服务器进程不能进入断点。

nodejs和pomelo的安装就不多说明，pomelo可以用npm安装

[使用WebStorm调试pomelo的官方说明](https://github.com/NetEase/pomelo/wiki/使用-WebStorm-IDE-调试-Pomelo-应用程序)

在上边的pomelo的官方说明里是在服务器的配置文件server.json的参数里加一个 "args": " --debug=32312 "启动参数。这是以debug方式进行调断的方式，如果要使用浏览器进行断点调试，只要把这个参数改为"args": "--inspect=9229" 。这样就可以使用Chrome等浏览器进行断点调试了。在使用Chrome进行断点调试前要先在Chrome上安装一下js的调试插件。

###在Chrome上安装js断点调试插件
先看Nodejs的官方说明

[nodejs调试方法的官方说明](https://nodejs.org/en/docs/inspector/)

最新版的node好像不用安装inspect就可以使用这种方式调试，直接看Chrome的配置方法，在Chrome中输入下边内容并回车，浏览器会让安装一个插件，这就是调试插件，安装它。
```bash
chrome://inspect
```
安装上之后,在浏览器里输入上边的内容后会显示，如下图：

![chrome安装插件后的效果图](/img/in-post/chromenodejs/1.png)

同时在浏览器的右上角也会有一个快速设置监听地址和端口的按钮：

![快捷按钮](/img/in-post/chromenodejs/2.png)

也可以选择上边的Discover network targets后边的Configure来进行设置：

![使用Discover network targets设置](/img/in-post/chromenodejs/3.png)

###开始使用chrome来断点调试pomelo服务器
找一个地方先建一个pomelo项目

新建pomelo项目可以参考官方的文档：

[pomelo的HelloWorld](https://github.com/NetEase/pomelo/wiki/pomelo的HelloWorld)

建好项目之后，加好game-server/config/servers.json中我们要调试的服务器参数"args": "--inspect=9229",同时打开chrome浏览器。

![加上--inspect参数](/img/in-post/chromenodejs/4.png)

cd到game-server目录,并运行game-server服务器
```bash
cd game-server
pomelo start
```
服务器启运后，可以看到终端中显示Debugger attached.文字,如下图：

![终端里会显示Debugger attached.](/img/in-post/chromenodejs/5.png)

同时chrome的js调试器也打开了。

![Developer Tools-Nodejs](/img/in-post/chromenodejs/6.png)

点击Sources菜单，可以看到pomole的源码，找到我们服务器的Handler.js文件，在这里打上断点。如下图:

![打上断点的handler.js文件](/img/in-post/chromenodejs/7.png)

这里运行的pomelo的HelloWorld项目，这个项目的客户端是web网页，我先cd到web-server目录，启动客户端的web服务器
```bash
cd web-server
node app.js
```
接下来在浏览器里输入运行web服务器后终端里提示的http地址：

![http服务器地址](/img/in-post/chromenodejs/8.png)

http://127.0.0.1:3001/index.html

打开之后，会看到Welcome to Pomelo的网页，下边有一个Test Game Server的按钮，点了之后，会在chrome中看到断点已被击中。

![断点击后的样子](/img/in-post/chromenodejs/9.png)

上图中的1就是我们断点的位置，2是nodejs的程序调用堆栈。

###总结
用这种方法来调试nodejs服务器程序还是比较方便的。当然了，chrome除了可以调试服务器代码外，调试web客户端那就更不在话下了。

