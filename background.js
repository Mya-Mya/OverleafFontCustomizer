// Message Router
chrome.runtime.onMessage.addListener((args, _ev, sendResponse) => {
    const { action, payload } = args
    const func = {
        "SET_FONT": setFont,
        "GET_CURRENT_FONT": getCurrentFont,
        "SET_LETTER_SPACING": setLetterSpacing,
        "SET_FONT_COLOR": setFontColor,
        "SET_BG_COLOR": setBgColor,
    }[action]
    const response = func(payload)
    sendResponse(response)
})

// Handlers
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