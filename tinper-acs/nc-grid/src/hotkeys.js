import React, { Component } from "react";
import { HotKeys } from "react-hotkeys";

const keyMap = {
    nextTabHandler: ["right", "down"],
    nextTabUSRHandler: ["shift+right"],
    prevTabHandler: ["left", "up"],
    prevTabUSLHandler: ["shift+left"],
    expand: ["space"]
};

/**
 * @author bbqin
 * @param {*} props
 * @description  tab页签的hotkey逻辑
 * @return {null}
 */
export function TabHotKey(props) {
    let {
        hotKeyboard = true,
        tabs = [],
        wrapperId,
        headerId,
        activeKey,
        ...others
    } = props || {};

    /**
     * @description 获取活跃元素
     * @param {*} comboKey
     */
    function getActiveTabElement(comboKey) {
        let wrapper = document.querySelector(`#${wrapperId}`);
        let activeTabTitle = document.querySelector(`#${headerId} li.active`);
        if (!activeTabTitle) {
            return null;
        }
        if (
            !comboKey &&
            activeTabTitle.firstElementChild === document.activeElement
        ) {
            return activeTabTitle;
        }
        if (comboKey && wrapper && wrapper.contains(document.activeElement)) {
            return activeTabTitle;
        }
        return null;
    }
    /**
     * @description 获取将要聚焦的元素
     * @param {*} dir
     * @param {*} comboKey
     */
    function getWillActiveTabElement(dir, comboKey) {
        let activeTabTitle = document.querySelector(`#${headerId} li.active`),
            first = document.querySelector(`#${headerId} li:first-child`),
            last = document.querySelector(`#${headerId} li:last-child`),
            willActiveElement = activeTabTitle;
        if (dir === "prev" && activeTabTitle.previousElementSibling) {
            willActiveElement = activeTabTitle.previousElementSibling;
        }
        if (dir === "prev" && !activeTabTitle.previousElementSibling) {
            willActiveElement = last;
        }
        if (dir === "next" && activeTabTitle.nextElementSibling) {
            willActiveElement = activeTabTitle.nextElementSibling;
        }
        if (dir === "next" && !activeTabTitle.nextElementSibling) {
            willActiveElement = first;
        }

        return willActiveElement;
    }

    return hotKeyboard ? (
        <HotKeys
            keyMap={keyMap}
            handlers={{
                nextTabHandler: e => {
                    let activeTabTitle = getActiveTabElement(false);
                    // console.log(e, document.activeElement, activeTabTitle);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        // console.log("next tab");
                        let next = getWillActiveTabElement("next");
                        next.click();
                        next.firstElementChild.focus();
                        // e.preventDefault();
                    }
                },
                nextTabUSRHandler: e => {
                    let activeTabTitle = getActiveTabElement(e.shiftKey);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        // console.log("next tab");
                        getWillActiveTabElement("next").click();
                        // e.preventDefault();
                    }
                },
                prevTabHandler: e => {
                    let activeTabTitle = getActiveTabElement(false);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        console.log("prev tab");
                        let prev = getWillActiveTabElement("prev");
                        prev.click();
                        prev.firstElementChild.focus();
                        // e.preventDefault();
                    }
                },
                prevTabUSLHandler: e => {
                    let activeTabTitle = getActiveTabElement(e.shiftKey);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle) {
                        console.log("prev tab");
                        getWillActiveTabElement("prev").click();
                        // e.preventDefault();
                    }
                },
                expand: e => {
                    // let wrapper = document.querySelector(`#${wrapperId}`);
                    let activeTabTitle = document.querySelector(`#${headerId}`);
                    // 如果当前focus元素在页签下
                    if (activeTabTitle.contains(document.activeElement)) {
                        e.preventDefault();
                        console.log("sapce trigger!");
                        // e.preventDefault();
                        activeTabTitle.querySelector("i").click();
                    }
                }
            }}
            className="tabs-hotkeys-wrapper"
            focused={true}
            attach={document.body}
            {...others}
        >
            {props.children}
        </HotKeys>
    ) : null;
}

export default TabHotKey;
