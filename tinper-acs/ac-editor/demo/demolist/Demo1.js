/**
 *
 * @title 富文本编辑器
 * @description 美观易用的React富文本编辑器，基于draft-js开发
 *
 */

import React, { Component } from 'react';
// 引入编辑器以及EditorState子模块
import AcEditor, { EditorState } from '../../src/index';
// 引入编辑器样式
// import 'ac-editor/dist/index.css';
class Demo1 extends Component {
    constructor() {
        super();
        this.state = {
            editorState: null
        }
    }
    componentDidMount() {
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = `<p><b>欢迎使用富文本编辑器</b></p>`
        // 使用EditorState.createFrom将html字符串转换为编辑器需要的editorState数据
        this.setState({
            editorState: EditorState.createFrom(htmlContent)
        })
    }
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML();
        console.log(htmlContent);
    }
    handleEditorChange = (editorState) => {
        this.setState({ editorState });
    }
    render() {
        const { editorState } = this.state;
        return (
            <div className="demoPadding">
                <AcEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                    onSave={this.submitContent}
                />
            </div>
        )
    }
}

export default Demo1;
