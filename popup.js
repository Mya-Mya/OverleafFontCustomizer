// DOMs
const $fontSelect = document.getElementById("font-select")
const $customFontContainer = document.getElementById("custom-font-container")
const $customFontInput = document.getElementById("custom-font-input")
const $currentFont = document.getElementById("current-font")
const $currentFontContainer = document.getElementById("current-font-container")
const $lsSelect = document.getElementById("ls-select")
const $fontColorSlider = document.getElementById("font-color-slider")
const $bgColorSlider = document.getElementById("bg-color-slider")

// Startups

/// Get current font
dispatch("GET_CURRENT_FONT").then(currentFont => {
    $currentFont.textContent = currentFont
})

/// List fonts
const FONTS = [
    ["Open Sans", "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"],
    ["Arial", undefined],
    ["Calibri", undefined],
    ["IPAexMincho", undefined],
    ["Helvetica", undefined],
    ["Noto Sans", undefined],
    ["Meiryo UI", undefined],
    ["UD デジタル 教科書体 NP", undefined],
    ["PT Serif", "https://fonts.googleapis.com/css2?family=PT+Serif&display=swap"],
    // ["Source Serif 4", "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz@8..60&display=swap"], // なぜかエラー
    ["Lora", "https://fonts.googleapis.com/css2?family=Lora&display=swap"],
    ["Literata", "https://fonts.googleapis.com/css2?family=Literata:opsz@7..72&display=swap"],
    ["Noto Serif", undefined],
    ["Cambria", undefined],
    ["Book Antiqua", undefined],
    ["Georgia", undefined],
    ["Century", undefined],
    ["Palatino Linotype", undefined],
    ["Sylfaen", undefined],
    ["Times New Roman", undefined],
    ["Yu Mincho", undefined],
]
function addFontList(name, url) {
    const $button = document.createElement("button")
    $button.textContent = name
    $button.style.fontFamily = name
    $button.addEventListener("click", () => {
        if (url != undefined) {
            // Web font
            dispatchLoadCSS(url)
        }
        dispatchSetFont(name)
        $customFontInput.value = ""
    })
    $fontSelect.appendChild($button)
}
FONTS.forEach(font => addFontList(font[0], font[1]))

/// List letter spacings
const LETTER_SPACINGS = ["0", "0.02em", "0.04em", "0.06em"]
LETTER_SPACINGS.forEach(ls => {
    const $button = document.createElement("button")
    $button.textContent = ls
    $button.addEventListener("click", () => {
        dispatchSetLetterSpacing(ls)
    })
    $lsSelect.appendChild($button)
})

// Handlers
$customFontInput.addEventListener("input", () => dispatchSetFont($customFontInput.value))
$fontColorSlider.addEventListener("input", () => { dispatchSetFontColor($fontColorSlider.value) })
$bgColorSlider.addEventListener("input", () => { dispatchSetBgColor($bgColorSlider.value) })

// Utilities
function dispatchLoadCSS(url) {
    dispatch("LOAD_CSS", { url })
}
function dispatchSetFont(fontFamily) {
    $currentFont.textContent = fontFamily
    dispatch("SET_FONT", { fontFamily })
}
function dispatchSetLetterSpacing(ls) {
    dispatch("SET_LETTER_SPACING", { ls })
}
function dispatchSetFontColor(value) {
    dispatch("SET_FONT_COLOR", { colorValue: value });
}
function dispatchSetBgColor(value) {
    dispatch("SET_BG_COLOR", { colorValue: value });
}

async function dispatch(action, payload = {}) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ "active": true, "lastFocusedWindow": true }, tabs => {
            const tab = tabs[0]
            chrome.tabs.sendMessage(tab.id, { action, payload }, resolve)
        })
    })
}