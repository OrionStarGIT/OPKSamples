1. package.json中，需要增加依赖： 
    1.1 在dependencies中增加依赖：paho-mqtt 
    1.2 在devDependencies中增加：@types/paho-mqtt（这个不增加也可以，如果编译报错，就增加）
2. 业务代码查看DemoViewModel类