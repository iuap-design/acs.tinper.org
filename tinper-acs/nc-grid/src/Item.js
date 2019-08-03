// 单元格编辑态组件
import React, { Component } from 'react';

export default class Item extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            content: {
                props: { itemtype }
            },
            isLineStatus
        } = this.props;
        if ((itemtype === 'refer' || itemtype === 'residtxt') && isLineStatus) {
            // 点击参照之外其他部分掉用参照onblur
            document.addEventListener('click', this.blur, false);
        }
    }

    componentWillUnmount() {
        const {
            content: {
                props: { itemtype }
            },
            isLineStatus
        } = this.props;
        if ((itemtype === 'refer' || itemtype === 'residtxt') && isLineStatus) {
            // 移除document事件
            document.removeEventListener('click', this.blur);
        }
    }

    blur = e => {
        const {
            content: {
                props: { onBlur, value },
                edittable_dom
            }
        } = this.props;
        if (edittable_dom.contains(this.item) && !this.item.contains(e.target) && edittable_dom.contains(e.target)) {
            typeof onBlur === 'function' && onBlur(value);
        }
    };

    render() {
        const { content } = this.props;
        return (
            <div
                style={content.props.itemtype === 'number' ? { textAlign: 'right' } : {}}
                ref={dom => { this.item = dom; }}
            >
                {content}
            </div>
        );
    }
}
