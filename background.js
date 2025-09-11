// Message Router
chrome.runtime.onMessage.addListener((args, _ev, sendResponse) => {
    const { action, payload } = args
    const func = {
        "LOAD_CSS": loadCSS,
        "SET_FONT": setFont,
        "GET_CURRENT_FONT": getCurrentFont,
        "SET_LETTER_SPACING": setLetterSpacing,
        "SET_FONT_COLOR": setFontColor,
        "SET_BG_COLOR": setBgColor,
        "ENABLE_LINE_BORDER": enableLineBorder,
        "DISABLE_LINE_BORDER": disableLineBorder,
    }[action]
    const response = func(payload)
    sendResponse(response)
})

// Utilities
function setLineBorderTop(value) {
    const style = document.createElement('style');
    style.textContent = `.cm-line { border-top:${value}; }`;
    document.head.appendChild(style);
}

// Handlers
function loadCSS(payload) {
    const { url } = payload
    const $ref = document.createElement("link")
    $ref.rel = "stylesheet"
    $ref.type = "text/css"
    $ref.href = url
    document.getElementsByTagName("head")[0].appendChild($ref)
}
function setFont(payload) {
    const { fontFamily } = payload
    const $cmeditor = document.querySelector(".cm-editor")
    $cmeditor.style.setProperty("--source-font-family", fontFamily)
    return undefined
}

function getCurrentFont(payload) {
    const $cmeditor = document.querySelector(".cm-editor")
    return $cmeditor.style.getPropertyValue("--source-font-family")
}

function setLetterSpacing(payload) {
    const { ls } = payload
    const $cmeditor = document.querySelector(".cm-editor")
    $cmeditor.style.letterSpacing = ls
}

function setFontColor(payload) {
    const { colorValue } = payload
    const $cmeditor = document.querySelector(".cm-editor")
    $cmeditor.style.color = `rgb(${colorValue},${colorValue},${colorValue})`
}

function setBgColor(payload) {
    const { colorValue } = payload
    const $cmeditor = document.querySelector(".cm-editor")
    $cmeditor.style.backgroundColor = `rgb(${colorValue},${colorValue},${colorValue})`
}

function enableLineBorder(payload) {
    setLineBorderTop("dotted 1px gray")
}

function disableLineBorder(payload) {
    setLineBorderTop("none")
}