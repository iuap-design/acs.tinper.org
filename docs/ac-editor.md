# Ac-Editor

[![npm version](https://img.shields.io/npm/v/ac-editor.svg)](https://www.npmjs.com/package/ac-editor)
[![NPM downloads](http://img.shields.io/npm/dt/ac-editor.svg?style=flat)](https://npmjs.org/package/ac-editor)


#### 一个基于draft-js的Web富文本编辑器，适用于React框架，兼容主流现代浏览器。

演示效果：[https://tinper-acs.github.io/ac-editor/](https://tinper-acs.github.io/ac-editor/)

## 特性
- 完善的文本内容编辑功能
- 诸多开放的编辑接口，良好的可扩展性
- 允许插入图片、音视频等多媒体内容
- 允许自定义多媒体内容的上传接口
- 允许设置图片的左右浮动（即文字绕排功能）
- 允许设置编辑器可用的颜色列表、字号以及字体
- 允许自定义需要展示的控制按钮和展示顺序
- 允许增加额外的自定义按钮
- 多语言支持（目前已支持简体中文、繁体中文和英文）

## 安装
```bash
# 使用yarn安装
yarn add ac-editor
# 使用npm安装
npm install ac-editor --save
```
## 使用

编辑器支持**value**和**onChange**属性，这类似于React中原生的input组件。通常情况下，可以用典型的**受控组件**的形式来使用本编辑器：

```jsx
import React from 'react';
// 引入编辑器以及EditorState子模块
import AcEditor, { EditorState } from 'ac-editor';
// 引入编辑器样式
import 'ac-editor/dist/index.css';

export default class EditorDemo extends React.Component {

  state = {
      editorState: null
  }

  async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    const htmlContent = await fetchEditorContent()
    // 使用EditorState.createFrom将html字符串转换为编辑器需要的editorState数据
    this.setState({
      editorState: EditorState.createFrom(htmlContent)
    })
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML();
    const result = await saveEditorContent(htmlContent);
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState });
  }

  render () {
    const { editorState } = this.state;
    return (
      <div className="my-component">
        <AcEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
      </div>
    )

  }

}
```

当然本编辑器也支持**defaultValue**属性，因此你也可以将本编辑器作为一个**非受控组件**来使用。

-------

## 组件属性

[文档参考](https://www.yuque.com/margox/be/gz44tn)

## 实例方法

[文档参考](https://www.yuque.com/margox/be/mrgy92)