---
layout:     post
title:      "linux自动内存清理"
subtitle: ""
date:       2018-04-10 12:00:00
author:     "Mage"
header-img: "img/post-bg-universe.jpg"
tags:
    - linux
---

因为服务器的内存本来就小，只有512m.所以定期清理一下内存就很有必要了。
下边是内存清理命令，把这个写到一个linux shell的free.sh文件中。要清理时运行一下就可以了。
```Makefile
#!/bin/bash
free -m
sync
echo 1 > /proc/sys/vm/drop_caches
echo 2 > /proc/sys/vm/drop_caches
echo 3 > /proc/sys/vm/drop_caches
free -m
```
对于想要自动清理内存的，可以写一个python脚本，使用后台运行这个脚本，定时调用上边的清理内存shell就可以了。
```Python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
import os
while True:
    time.sleep(10) #3小时=10800秒
    tmp = os.popen('sh freem.sh').readlines()
    for s in tmp:
        print s
```
上边的是python调用系统命令的free.py文件，把这个文件和清理shell文件放在同一个目录。然后后台运行这个python脚本就可以了，上边的代码会每3小时清理一次内存,清理后的结果会输出到标准输出。
后台运行脚本的方法：
```Makefile
nohup python free.py >log.txt 2>&1 &
```
终端中运行上边的命令会在后台运行free.py同时把输出结果保存在log.txt中。
