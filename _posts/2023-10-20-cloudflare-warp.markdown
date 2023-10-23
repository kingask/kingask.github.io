---
layout:     post
title:      "Cloudflare warp配置"
subtitle: ""
date:       2023-10-20 00:54:00
author:     "Mage"
header-img: "img/post-bg-universe.jpg"
tags:
    - Windows
---



# Cloudfare warp 配置7



#### 1.下载ip优选工具1

ip优选111

[点击下载](https://dl.fuluping.com/warp.rar)







#### 2.下载cloudflare wrap 

这个官方下载就可以  下载以后拿到 许可密钥  26位



#### 3.生成wireguard 配置文件

将上述生成了26位许可 作为变量输入到下面脚本中
https://replit.com/@misaka-blog/wgcf-profile-generator



#### 4.将生成的配置文件的 Endpoint IP 修改为 优选的ip和端口