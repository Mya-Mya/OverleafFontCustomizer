// DOMs
const $fontSelect = document.getElementById("font-select")
const $customFontContainer = document.getElementById("custom-font-container")
const $customFontInput = document.getElementById("custom-font-input")
const $currentFont = document.getElementById("current-font")
const $currentFontContainer = document.getElementById("current-font-container")

// Startups
dispatch("GET_CURRENT_FONT").then(currentFont => {
    $currentFont.textContent = currentFont
})

const NAMED_FONTS = [
    "Arial", "IPAexMincho", "Helvetica", "Verdana", "Noto Sans", "Meiryo UI", "UD デジタル 教科書体 NP",
    "Georgia", "Century", "Palatino Linotype", "Sylfaen", "Times New Roman", "Yu Mincho", "Lucida Console",
    "Cursive", "Comic Sans MS"
]
NAMED_FONTS.forEach(font => {
    const $button = document.createElement("button")
    $button.textContent = font
    $button.style.fontFamily = font
    $button.addEventListener("click", () => {
        dispatchSetFont(font)
        $customFontInput.value = ""
    })
    $fontSelect.appendChild($button)
})

// Handlers
$customFontInput.addEventListener("input", () => dispatchSetFont($customFontInput.value))

// Utilities
function dispatchSetFont(fontFamily) {
    $currentFont.textContent = fontFamily
    dispatch("SET_FONT", { fontFamily })
}

async function dispatch(action, payload = {}) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ "active": true, "lastFocusedWindow": true }, tabs => {
            const tab = tabs[0]
            chrome.tabs.sendMessage(tab.id, { action, payload }, resolve)
        })
    })
}