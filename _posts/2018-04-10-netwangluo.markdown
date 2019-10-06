---
layout:     post
title:      "目前流行的深度学习网络框架 "
subtitle: ""
date:       2018-04-10 12:00:00
author:     "Mage"
header-img: "img/post-bg-universe.jpg"
tags:
    - 机器学习
---
## 一. TensorFlow ##
源码地址:
https://github.com/tensorflow/tensorflow

完美的python创建网络计算图，使用CPU和GPU计算，目前使用人数最多的深度学习库，目前唯一的不足是创建的网络是静态的，不能动态调整网络。TensorFlow是相对高阶的机器学习库，使用python设计神经网络结构，不必为了追求高效率的实现亲自写C++或CUDA代码，和Theano一样支持自动求导，不需要用户通过反向传播求解梯度。其核心代码和Caffe一样是C++编写。除核心代码的C++接口，TensorFlow还有Python,Go,Java接口，通过SWIG(Simplified Wrapper and Interface Generator)实现。

## 二. Theano ##
源码地址:
https://github.com/theano/theano

Theano诞生于2008的，由蒙特利尔大学Lisa Lab团队开发维护，因出现时间早，可以算是这类库的始祖之一。核心是一个数学表达式的编译器，专为处理大规模神经网络训练设计。
主要优势：

    1)集成NumPy，可以直接使用NumPy和ndarray，API接口学习成本低
    2)计算稳定性好，如可以精准计算输出值很小的函数（像log(1+x))
    3)动态的生成C或CUDA代码，用以编译成高效机器代码
    
 Theano是完全基于Python(C++/CUDA代码也是打包为Python字符串)的符号计算库。
## 三. Caffe ##
源码地址:https://github.com/BVLC/caffe

创始人是加州大学伯克利的Ph.D.贾扬清，同时是TensorFlow作者之一。
 Caffe主要优点:
 
    1)容易上手，网络结构是以配置文件形式定义，不需要代码设计风格
    2)训练速度快，能训练state-of-the-art的模型与大规模数据
    3)组件模块化，可方便拓展到新的模型和学习任务上
Caffe核心概念是Layer，每一个神经网络的模块都是一个Layer,Layer接收输入数据，同时经内部计算产出数据。设计网络时，只要把各个Layer通过编写protobuf配置文件定义拼接在一起组成完整网络。实现新的Layer时，需要将正向和反向两种计算过程的函数都实现，这部分需要用户自已写C++或者CUDA代码，对普通用户来说比较难上手。Caffe最开始设计时只针对图像，所以他对卷积神经网络支持的非常好。 

## 四. Torch ##
源码地址:https://github.com/torch/torch7

Torch自已定位是LuaJIT上的高效科学计算库，优先GPU，上层使用lua语言作为网络设计语言，底层C++.
Torch的nn库支持神经网络，自编码器，线性回归，卷积网络，循环神经网络等 ，同时支持定制的损失函数及梯度计算。 Torch也是基于Layer的连接来定义网络， Torch属于命令式编程模式。

## 五. Leaf ##
源码地址:https://github.com/autumnai/leaf

基于Rust语言，跨平台深度学习和机器智能框架,是autumnai AI计划重要组件

## 六. Deeplearning4J ##
源码地址:https://github.com/deeplearning4j/deeplearning4j

是基于Java和Scala的开源分布式深度学习库,由Skymind于2014年6月发布

## 七. Chainer ##
源码地址:https://github.com/chainer/chainer

由日本Preferred Networks公司于2015年6月发布，支持多GPU

## 八. Lasagne ##
源码地址:https://github.com/lasagne/lasagne

Lasagne是一个基于Theano的轻量级神经网络库

## 九. Keras ##
源码地址:https://github.com/fchollet/keras

Keras是一个崇尚极简、高度模块化的神经网库，使用python实现，可同时运行在TensorFlow和Theano上

## 十.CNTK ##
源码地址:https://github.com/microsoft/CNTK

Computational Network Toolkit是微软研究院的学习框架

## 十一.DSSTNE ##
源码地址:https://github.com/amzn/amazon-dsstne

Deep Scalable Sparse Tensor Network Engine是亚马逊的稀疏神经网络框架

## 十二.DIGITS
源码地址:https://github.com/NVIDIA/DIGITS

Deep Learning GPU Training System是Caffe的高级封装,用在web上,通过url识别图

## 十三.MXNet

源码地址:https://github.com/dmlc/mxnet

NXNet是DMLC(Distributed Machine Learning Community)开发的库,AWS推荐

## 十四.R语言版TensorFlow 
源码地址:https://github.com/rstudio/tensorflow

## 十五.Node.js版TensorFlow
源码地址:https://github.com/node-tensorflow/node-tensorflow

## 十六.Julia版TensorFlow
源码地址:https://github.com/malmaud/tensorflow.jl


