# report-info

收集项目数据，如项目名、分支、项目uri、eslint配置等，支持扩展收集自定义的数据，支持配置uri地址上传数据。

## 安装
```bash
npm i @sxf/report-info --registry=http://200.200.151.86:7001/
```

## 命令使用
npm全局安装后，可通过命令行调用。

```bash
report-info --debug --extra-path path --no-upload --uri http://localhost:8080/test
```

参数说明：
* --debug。可选参数。是否输出调试信息
* --extra-path。可选参数。收集自定义数据的js文件目录，目录内的所有js文件将会被调用，所有文件提供一个`getData`方法，用于获取自定义数据。参考`data/eslint.js`
* --no-upload。可选参数。带该参数时不上传数据
* --uri。当不配置`--no-upload`时为必选参数。上传数据的地址

### 收集数据说明
工具内置收集数据如下。
#### git分支数据
* project
* branch
* fetchUrl

#### 项目本身的数据（package.json）
* name
* version
* scripts

#### eslint配置数据
* .eslintrc 或 .eslintrc.js 或 .eslintrc.json
* .eslintignore

## 自定义数据
通过指定`--extra-data-path`收集自定义数据，参考`test`目录内的用法。

## 默认参数
上传配置使用了一些默认参数，如下。
* POST
* timeout。超时时间60s
* 上传格式使用json。