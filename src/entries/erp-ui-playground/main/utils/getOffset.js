const getPlaygroundWrapDOMOffset = ele => {
    // return document.defaultView.getComputedStyle(ele).transform
    let top = ele.offsetTop
    let left = ele.offsetLeft
    let posParent = ele.offsetParent
    while (posParent.className.indexOf('playground-content') < 0) {
        top += posParent.offsetTop
        left += posParent.offsetLeft
        posParent = posParent.offsetParent
    }
    return {top, left}
}


export default getPlaygroundWrapDOMOffset
