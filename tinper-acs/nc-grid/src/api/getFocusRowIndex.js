let currentIndex;

function getFocusRowIndex() {
    return currentIndex;
}

function setFocusRowIndex(index) {
    currentIndex = index;
}

export {
    getFocusRowIndex,
    setFocusRowIndex
};