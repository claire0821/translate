# Translate

[![release](https://img.shields.io/badge/release-1.0.0-239b59b6)](https://github.com/claire/translate/releases)
[![license](https://img.shields.io/badge/license-MIT-239b59b6)](https://opensource.org/licenses/MIT)
&nbsp;

这是一个Chrome翻译插件，致力于快速、简单翻译文本。欢迎体验。

# README.md
- en [English](README.md)
- zh_CN [简体中文](readme/README.zh_CN.md)

# This project is also hosted at
- [GitHub](https://github.com/claire0821/translate)
- [Gitee](https://gitee.com/zam1024t/translate)

## ✨ 特性

- 支持百度和腾讯翻译
- 界面简单
- 更多特性待开发...

## 🎉 应用界面
![img_2.png](https://github.com/claire0821/translate/tree/master/shots/img_2.png)

## ☑️ TODO

- [x] 接入腾讯翻译
- [x] 接入其他免费翻译平台
- [ ] 剩余翻译额度提醒

## 🧑🏻‍🔧技术栈

- `Chrome Extension`
- `bootstrap`

## 📢 项目说明

- 兴趣之作，欢迎提出任何修改意见，但不保证任何更新以及功能的可靠性
- 程序无任何收费和用户信息收集行为，翻译接口须自行注册开通服务
## 截图
**单词翻译** 鼠标移动到需要翻译的单词上
![word.gif](https://github.com/claire0821/translate/tree/master/shots/word.gif)
**句子翻译** 鼠标点击选中需要翻译的句子
![sentence.gif](https://github.com/claire0821/translate/tree/master/shots/sentence.gif)

## 问题

### background.js
一开始就执行，且一直执行
- 开始通过navigator获取当前的语言
### content.js
注入页面，在刷新当前页面或者打开新页面时执行。通过console.log可在F12中看到输出信息

### popup.js
打开界面执行，关闭结束

### 全局变量保存在chrome.storage，通过接口chrome.storage.local.get和chrome.storage.local.set操作
需要在manifest中permissions申请权限
### [百度翻译API](https://api.fanyi.baidu.com/doc/21)
- 在百度翻译开发平台注册账号并开通通用文本翻译
  [HTTPS 地址](https://fanyi-api.baidu.com/api/trans/vip/translate)
  翻译语种列表

### [腾讯翻译API](https://cloud.tencent.com/document/api/551/15619)
- 注册并登陆腾讯云
- 申请机器翻译TMT(每月500万字符免费额度)
- 点击开通付费版
- 获取密钥
  新建密钥(https://console.cloud.tencent.com/cam/capi)
  ![img.png](https://github.com/claire0821/translate/tree/master/shots/img.png)
  复制密钥
  ![img_1.png](https://github.com/claire0821/translate/tree/master/shots/img_1.png)

#### 签名生成
在线调试(https://console.cloud.tencent.com/api/explorer?Product=tmt&Version=2018-03-21&Action=TextTranslate)
生成签名demo参考文档(https://cloud.tencent.com/document/api/213/30654)NodeJS示列
使用了crypto-js替代crypto生成签名(https://cdn.staticfile.org/crypto-js/3.1.2/rollups/hmac-sha256.js)
发送post请求后返回AuthFailure.SignatureFailure留意以下地方
- service是tmt，endpoint是tmt.tencentcloudapi.com
- 通过在线调试页面输入相同的时间戳生成签名，对比发送请求
- 添加X-TC-Language



## 🛠 快速开始

### 从源代码构建

```shell
git clone https://github.com/claire0821/translate.git
cd translate
```


### 获取可执行文件

- 正式发行版 [🚀 Releases](https://github.com/claire0821/translate/releases/)
- 自动构建的测试版 [🤖 CI](https://github.com/claire0821/translate/actions)


## 🤝 交流反馈

- 提交 [📌Issues](https://github.com/claire0821/translate/issues)
- 博客评论区 [📌Blog Page](https://juejin.cn/creator/home)

## 📜 开源许可

- 基于 [MIT license](https://opensource.org/licenses/MIT) 许可进行开源。
