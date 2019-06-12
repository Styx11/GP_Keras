# GP_Keras
> Keras实现RNN+LSTM的模型自动编写古诗（应用层）

![](https://img.shields.io/david/Styx11/GP_Keras.svg)![](https://img.shields.io/github/license/Styx11/GP_Keras.svg)

![](https://s2.ax1x.com/2019/06/05/VURnVx.gif)

## Info
GP_Keras 为 2019 年 6 月互联网➕参赛项目。

* 2019 年 6 月 11 日，获得互联网➕院级二等奖。

本项目设计了基于 LSTM 和 RNN 网络的藏头诗自动生成框架，建立“藏头诗生成”SPA，用户输入关键字，进而生成使用者想表达的情感的“藏头诗”，并且可以根据自己的需要，设定参数，生成七言或五言古诗。

RNN 循环神经网络模型位于团队成员 repo 中 👉 [点此访问](https://github.com/laugh12321/GeneratePoetry-Translate)

本 repo 中存放 GP_Keras 的 SPA 应用层，以及示例服务器、~~生产环境~~服务器代码。

## Members
* [Styx](https://github.com/Styx11)：应用层及服务端实现
* [Laugh](https://github.com/laugh12321)： 神经网络模型实现
* 庆儿呀🌸：团队管理及策划

## Build
```
# install dependencies
npm install

# build for production with minification
npm run build
```

## License
MIT.