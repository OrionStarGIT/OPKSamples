# HelloRobotSample
## 1.目录结构
├─app 业务代码
│  ├─demo  
│  │  ├─ConfigUtils.ts 服务器配置参数获取   
│  │  ├─DemoEvent.ts 从当前页面跳转至其他页面的事件定义(在trigger中使用)  
│  │  ├─DemoModel.ts 业务模块的数据模型  
│  │  ├─DemoProvider.tsx 当前业务模块的入口，负责各个组件的组合和初始化  
│  │  ├─DemoTrigger.ts 当前业务模块的跳转控制，通过接收xxxEvent中发送的事件，跳转到各个不同的模块  
│  │  ├─DemoView.tsx 业务模块的UI显示  
│  │  ├─DemoViewModel.ts 负责模块的业务逻辑控制  
│  │  ├─DemoVoice.ts 负责业务模块语音识别的相关功能  
│  ├─App.js 运行入口页面  
│  ├─AppDebug.js 调试入口页面           
├─dist 打包后的opk目录  
├─img 图片资源  
├─node_modules 第三方库源码  
├─app.json 基本配置文件，不能修改  
├─index.js 程序入口  
├─package.json npm依赖包管理
## 2.配置开发环境
开发环境需要依赖以下开发工具：Node10及以上且不高于Node13版本、orionos-sh脚手架、IDE工具。  
**PS：请将您的adb更新为最新版本**
### 2.1安装nodejs
-  windows  
   Windows系统需要安装12.10以下版本的nodejs，点击网址下载nodejs：https://nodejs.org/dist/v12.10.0/  
   node-v12.10.0-x64.msi  
   node-v12.10.0-x86.msi   
   下载完成后点击安装
-  Mac os或者Linux  
   打开终端，在终端中输入如下命令即可安装：
~~~~
    brew install node
~~~~
&nbsp; &nbsp; &nbsp; &nbsp; 若提示没有brew，请先执行：
~~~~
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
~~~~
### 2.2安装脚手架工具
登录npm 服务器 (如果您是首次登陆，请联系售前，申请npm账号密码）  
在Windows上点击【开始】-【运行】-【输入CMD】，在命令行界面输入如下命令并输入npm用户名、密码和邮箱:
~~~~
npm login --registry=https://npm.ainirobot.com/repository/eve-group/
~~~~
在命令行界面输入如下命令安装脚手架
~~~~
npm install -g orionos-sh --registry=https://npm.ainirobot.com/repository/eve-group/
~~~~
### 2.3安装IDE
可使用WebStorm 或Visual Studio Code，直接从官网下载即可。
##3.运行程序
连接机器人，执行如下命令：
~~~~
orionos-sh debug
~~~~
### 4.更多帮助内容请查看官网文档
http://orionbase.cn/
