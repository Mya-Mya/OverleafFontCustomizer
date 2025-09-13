// State
let setting = {
    "fontFamily": "",
    "fontSizePx": 0,
    "letterSpacingEm": 0,
    "wordSpacingEm": 0,
    "lineHeightScale": 0,
    "fontColorLevel": 0,
    "bgColorLevel": 0,
    "lineBorderEnabled": false
}

/**
 * 
 * @param {string} fieldName 
 */
function applyToPage(fieldName) {
    const $cmeditor = document.querySelector(".cm-editor")
    switch (fieldName) {
        case "fontFamily":
            $cmeditor.style.setProperty("--source-font-family", setting.fontFamily)
            break
        case "fontSizePx":
            $cmeditor.style.setProperty("--font-size", setting.fontSizePx + "px")
            break
        case "letterSpacingEm":
            $cmeditor.style.letterSpacing = setting.letterSpacingEm + "em"
            break
        case "wordSpacingEm":
            $cmeditor.style.wordSpacing = setting.wordSpacingEm + "em"
            break
        case "lineHeightScale":
            $cmeditor.style.setProperty("--line-height", setting.lineHeightScale)
            break
        case "fontColorLevel":
            $cmeditor.style.color = `rgb(${setting.fontColorLevel},${setting.fontColorLevel},${setting.fontColorLevel})`
            break
        case "bgColorLevel":
            $cmeditor.style.backgroundColor = `rgb(${setting.bgColorLevel},${setting.bgColorLevel},${setting.bgColorLevel})`
            break
        case "lineBorderEnabled":
            if (setting.lineBorderEnabled) {
                setLineBorderTop("dotted 1px gray")
            } else {
                setLineBorderTop("none")
            }
            break
        default:
            break
    }
}
// Message Router
chrome.runtime.onMessage.addListener((args, _ev, sendResponse) => {
    const { action, payload } = args
    console.log(action, payload)
    switch (action) {
        case "SET_VALUE":
            const { fieldName, value } = payload
            setting[fieldName] = value
            applyToPage(fieldName)
            break
        case "GET_SETTING":
            sendResponse(setting)
            break
        case "LOAD_CSS":
            const { url } = payload
            const $ref = document.createElement("link")
            $ref.rel = "stylesheet"
            $ref.type = "text/css"
            $ref.href = url
            document.getElementsByTagName("head")[0].appendChild($ref)
        default:
            break
    }
})

// Utilities
function setLineBorderTop(value) {
    const style = document.createElement('style')
    style.textContent = `.cm-line { border-top:${value} }`
    document.head.appendChild(style)
}