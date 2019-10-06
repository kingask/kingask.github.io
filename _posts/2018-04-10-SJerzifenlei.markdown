---
layout:     post
title:      "tensorflow一个二值分类的例子"
subtitle: ""
date:       2018-04-10 12:00:00
author:     "Mage"
header-img: "img/post-bg-universe.jpg"
tags:
    - 机器学习
---

## 书中原例子 ##
```python
import tensorflow as tf
from numpy.random import RandomState

batch_size = 8

w1 = tf.Variable(tf.random_normal([2,3],stddev=1,seed=1))
w2 = tf.Variable(tf.random_normal([3,1],stddev=1,seed=1))

x = tf.placeholder(tf.float32,shape=(None,2),name='x-input')
y_ = tf.placeholder(tf.float32,shape=(None,1),name='y-input')


a = tf.matmul(x, w1)
y = tf.matmul(a, w2)


cross_entropy = -tf.reduce_mean(y_ * tf.log(tf.clip_by_value(y,1e-10,1.0)))

train_step = tf.train.AdamOptimizer(0.001).minimize(cross_entropy)


#random data
rdm = RandomState(1)
dataset_size = 128000
X = rdm.rand(dataset_size, 2)
Y = [[int(x1+x2 < 1)] for (x1,x2) in X]

#tensorflow session
with tf.Session() as sess:
	init_op = tf.global_variables_initializer()
	sess.run(init_op)
	'''
	w1 = [[-0.81131822,1.48459876,0.06532937]]
			[-2.44270396,0.0992484,0.59122431]
	w2 = [[-0.81131822],[1.48459876],[0.06532937]]

	'''

	STEPS = 5000
	for i in range(STEPS):
		start = (i * batch_size) % dataset_size
		end = min(start + batch_size,dataset_size)
		sess.run(train_step,feed_dict={x:X[start:end],y_:Y[start:end]})

		if i % 1000 == 0:

			total_cross_entropy = sess.run(cross_entropy,feed_dict={x:X,y_:Y})

			print "After %d training step(s),cross entropy on all data is %g"%(i,total_cross_entropy)



```
  
原例子自已在机器上跑的结果与书中相同，但当用新数据测试这个网络对二值分类的结果时，发现训练出来的网络并没有办法对输入的新数据完成分类。

经过研究代码后，发现原例子中使用了交叉商，但并没有使用softmax输出激活函数，网络作二值分类，但只有一个输出。用了交叉商，但只有一个输出，因为只有一个输出也没有办法用softmax输出激活函数。所在这个输出的地方强行用了一个输出值钳位函数tf.clip_by_value,把这一个输出钳死在0到1之间。

下边是我修改后的代码。
## 修改后的二值分类代码 ##
 
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2017-10-24 09:29:05
# @Author  : Your Name (you@example.org)
# @Link    : http://example.org
# @Version : $Id$
import tensorflow as tf

from numpy.random import RandomState

batch_size = 8

w1 = tf.Variable(tf.random_normal([2,3],stddev=1,seed=1))
w2 = tf.Variable(tf.random_normal([3,2],stddev=1,seed=1))

b1 = tf.Variable(tf.zeros([3]))
b2 = tf.Variable(tf.zeros([2]))

x = tf.placeholder(tf.float32,shape=(None,2),name='x-input')
y_ = tf.placeholder(tf.float32,shape=(None,2),name='y-input')

a = tf.matmul(x, w1) + b1
y = tf.nn.softmax(tf.matmul(a,w2) + b2)

cross_entropy = -tf.reduce_mean(tf.reduce_sum( y_ * tf.log(y)))
train_step = tf.train.GradientDescentOptimizer(0.002).minimize(cross_entropy)

#random data
rdm = RandomState(1)
dataset_size = 1280
X = rdm.rand(dataset_size, 2)
Y = [[int(x1+x2 < 1),int(x1+x2>=1)] for (x1,x2) in X]

rdm2 = RandomState(1)
Xc = rdm2.rand(10, 2)

#tensorflow session
with tf.Session() as sess:
	init_op = tf.global_variables_initializer()
	sess.run(init_op)
	'''
	w1 = [[-0.81131822,1.48459876,0.06532937]]
			[-2.44270396,0.0992484,0.59122431]
	w2 = [[-0.81131822],[1.48459876],[0.06532937]]

	'''

	STEPS = 50000
	for i in range(STEPS):
		start = (i * batch_size) % dataset_size
		end = min(start + batch_size,dataset_size)
		sess.run(train_step,feed_dict={x:X[start:end],y_:Y[start:end]})

		if i % 1000 == 0:
			total_cross_entropy = sess.run(cross_entropy,feed_dict={x:X,y_:Y})
			print "After %d training step(s),cross entropy on all data is %g"%(i,total_cross_entropy)

	print 'w1',sess.run(w1)
	print 'w2',sess.run(w2)
	for d in Xc:
		xt = d
		xtinput = tf.constant(xt,shape=[1,2],dtype=tf.float32)
		a1 = tf.matmul(xtinput, w1) + b1
		y1 = tf.nn.softmax(tf.matmul(a1,w2) + b2)
		yt = sess.run(y1)
		yout = 0
		if yt[0][1] > 0.5:
			yout = 1
		print xt,yout,yt
```
修改的内容：

将原网络的输出改成二个输出，在输出使用softmax激活函数。经过修改的代码并加上测试部分代码，运行后的二值分类结果很是理想。看来原书中的例子可能只是一个样例，并不能产生结果。

下边是测试中生成10个数的分类结果

![安装完成后的样子](/img/in-post/SJerzifenlei/1.png)

