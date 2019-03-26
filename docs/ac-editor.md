# 富文本编辑器 AcEditor

一个基于draft-js的Web富文本编辑器，适用于React框架，兼容主流现代浏览器。

## 何时使用

富文本编辑器

## 如何使用

```
使用yarn安装
yarn add ac-editor

使用npm安装
npm install ac-editor --save

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

## 代码演示


## API 

[文档参考](https://www.yuque.com/margox/be/gz44tn)

[文档参考](https://www.yuque.com/margox/be/mrgy92)

## 注意事项

暂无

## 更新日志



