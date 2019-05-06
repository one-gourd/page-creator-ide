## 概览

page-creator-ide

## 安装使用

npm 包方式：
```shell
npm install --save page-creator-ide
```

web 方式：
```html
<script src="https://unpkg.com/page-creator-ide@0.1.1/dist/index.umd.js"></script>
```
引入之后将会暴露全局变量 `pageCreatorIDE`.

> 如果你想要在 webpack 中 external 该库，可以使用以下配置：
```js
{
    externals: {
        "page-creator-ide": {
            "commonjs": "page-creator-ide",
            "commonjs2": "page-creator-ide",
            "amd": "page-creator-ide",
            "root": "pageCreatorIDE"
        }
    }
}
```

## 如何本地开发？

### 本地调试

首先从 git 仓库拉取代码，安装依赖项：
```shell
git clone https://github.com/one-gourd/page-creator-ide.git

npm install

## 安装 peerDependencies 依赖包
npm install ide-code-editor@0.x.x ss-tree@1.x.x ide-lib-utils@0.x ide-lib-base-component@0.x ide-lib-engine@0.x ette@0.x ette-proxy@0.x ette-router@0.x antd@3.x mobx@4.x mobx-react@5.x mobx-react-lite@1.x mobx-state-tree@3.10.x react@16.x styled-components@4.x.x react-dom@16.x
```

运行以下命令后，访问 demo 地址： http://localhost:9000
```shell
npm run dev
```

也可访问 [storybook](https://github.com/storybooks/storybook) 参考具体的使用案例：http://localhost:9001/
```shell
npm run storybook
```
P.S. 由于需要依赖 [ide-code-editor](https://github.com/one-gourd/ide-code-editor) 仓库比较特别，需要：
 1. 将[ide-code-editor](https://github.com/one-gourd/ide-code-editor) 仓库下载到本地
 2. 本地运行 `npm run build` 打出其 `dist` 目录
 3. 开启本地服务器的 `9005` 端口，推荐使用 [http-server](https://www.npmjs.com/package/http-server)：

![http server](https://ws3.sinaimg.cn/large/006tNc79ly1fz6cheyqhvj30jj03kaai.jpg)

### 运行测试用例

使用 [jest](https://jestjs.io) 进行测试，执行：

```shell
npm test
```

### 打包发布

普通的 npm 发布即可，记得发布前需要手动打包：

```shell
npm run build && npm publish
```


