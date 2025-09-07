// Message Router
chrome.runtime.onMessage.addListener((args, _ev, sendResponse) => {
    const { action, payload } = args
    const func = { 
        "SET_FONT": setFont,
        "GET_CURRENT_FONT": getCurrentFont
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

function getCurrentFont(payload){
    const $cmeditor = document.querySelector(".cm-editor")
    return $cmeditor.style.getPropertyValue("--source-font-family")
}