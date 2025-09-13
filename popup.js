// DOMs
/**
 * @param {string} id 
 * @returns {HTMLElement}
 */
function $(id){
    return document.getElementById(id)
}

const $currentFontFamily = $("current-font-family")
const $fontFamilySelect = $("font-family-select")
const $customFontFamilyInput = $("custom-font-family-input")

const $currentFontSize = $("current-font-size")
const $fontSizeSlider = $("font-size-slider")

const $currentLetterSpacing = $("current-letter-spacing")
const $letterSpacingSlider = $("letter-spacing-slider")

const $currentWordSpacing = $("current-word-spacing")
const $wordSpacingSlider = $("word-spacing-slider")

const $currentLineHeight = $("current-line-height")
const $lineHeightSlider = $("line-height-slider")

const $currentFontColor = $("current-font-color")
const $fontColorSlider = $("font-color-slider")

const $currentBgColor = $("current-bg-color")
const $bgColorSlider = $("bg-color-slider")

const $lineBorderCheckbox = $("line-border-checkbox")

// Startups

dispatchGetSetting().then(setting=>{
    $currentFontFamily.textContent = setting.fontFamily

    $currentFontSize.textContent = setting.fontSizePx+"px"
    $fontSizeSlider.value = setting.fontSizePx

    $currentLetterSpacing.textContent = setting.letterSpacingEm+"em"
    $letterSpacingSlider.value = setting.letterSpacingEm

    $currentWordSpacing.textContent = setting.wordSpacingEm+"em"
    $wordSpacingSlider.value = setting.wordSpacingEm

    $currentLineHeight.textContent = setting.lineHeightScale
    $lineHeightSlider.value = setting.lineHeightScale

    $currentFontColor.textContent = setting.fontColorLevel
    $fontColorSlider.value = setting.fontColorLevel

    $currentBgColor.textContent = setting.bgColorLevel
    $bgColorSlider.value = setting.bgColorLevel

    $lineBorderCheckbox.checked = setting.lineBorderEnabled
})


// Fonts
const FONTS = [
    ["Nunito Sans", "https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap"],
    ["Open Sans", "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"],
    ["Roboto", "https://fonts.googleapis.com/css2?family=Roboto&display=swap"],
    ["Lexend", "https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap"],
    ["Lato", "https://fonts.googleapis.com/css2?family=Lato&display=swap"],
    ["Inter", "https://fonts.googleapis.com/css2?family=Inter:opsz@14..32&display=swap"],
    ["Arial", undefined],
    ["Verdana", undefined],
    ["Calibri", undefined],
    ["IPAexMincho", undefined],
    ["Helvetica", undefined],
    ["Noto Sans", undefined],
    ["Meiryo UI", undefined],
    ["UD デジタル 教科書体 NP", undefined],
    ["PT Serif", "https://fonts.googleapis.com/css2?family=PT+Serif&display=swap"],
    ["凸版文久明朝", undefined],
    // ["Source Serif 4", "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz@8..60&display=swap"], // なぜかエラー
    ["Lora", "https://fonts.googleapis.com/css2?family=Lora&display=swap"],
    ["Spectral", "https://fonts.googleapis.com/css2?family=Spectral&display=swap"],
    // ["Merriweather", "https://fonts.googleapis.com/css2?family=Merriweather:opsz,wght@18..144,300..900&display=swap"], // なぜかエラー
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
    ["BIZ UDPMincho", "https://fonts.googleapis.com/css2?family=BIZ+UDPMincho&display=swap"],
    ["筑紫B丸ゴシック", undefined],
    ["Zen Kaku Gothic New", "https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New&display=swap"],
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
        dispatchSetValue("fontFamily", name)
        $customFontFamilyInput.value = ""
    })
    $fontFamilySelect.appendChild($button)
}
FONTS.forEach(font => addFontList(font[0], font[1]))

// Input Event Handlers
$fontSizeSlider.addEventListener("input", ()=>{
    $currentFontSize.textContent = $fontSizeSlider.value+"px"
    dispatchSetValue("fontSizePx", $fontSizeSlider.value)
})

$letterSpacingSlider.addEventListener("input", ()=>{
    $currentLetterSpacing.textContent = $letterSpacingSlider.value+"em"
    dispatchSetValue("letterSpacingEm", $letterSpacingSlider.value)
})

$wordSpacingSlider.addEventListener("input", () => {
    $currentWordSpacing.textContent = $wordSpacingSlider.value + "em"
    dispatchSetValue("wordSpacingEm", $wordSpacingSlider.value)
})

$lineHeightSlider.addEventListener("input", () => {
    $currentLineHeight.textContent = $lineHeightSlider.value
    dispatchSetValue("lineHeightScale", $lineHeightSlider.value)
})

$fontColorSlider.addEventListener("input", () => {
    $currentFontColor.textContent = $fontColorSlider.value
    dispatchSetValue("fontColorLevel", $fontColorSlider.value)
})

$bgColorSlider.addEventListener("input", () => {
    $currentBgColor.textContent = $bgColorSlider.value
    dispatchSetValue("bgColorLevel", $bgColorSlider.value)
})

$lineBorderCheckbox.addEventListener("change", () => {
    dispatchSetValue("lineBorderEnabled", $lineBorderCheckbox.checked)
})


// Utilities
function dispatchLoadCSS(url) {
    dispatch("LOAD_CSS", { url })
}

function dispatchSetValue(fieldName, value){
    return dispatch("SET_VALUE", {fieldName, value})
}

function dispatchGetSetting(){
    return dispatch("GET_SETTING")
}

async function dispatch(action, payload = {}) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ "active": true, "lastFocusedWindow": true }, tabs => {
            const tab = tabs[0]
            chrome.tabs.sendMessage(tab.id, { action, payload }, resolve)
        })
    })
}