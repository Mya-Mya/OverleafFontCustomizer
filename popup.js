// DOMs
/**
 * @param {string} id 
 * @returns {HTMLElement}
 */
function $(id) {
    return document.getElementById(id)
}

const $currentFontFamily = $("current-font-family")
const $fontFamilySelect = $("font-family-select")
const $customFontFamilyInput = $("custom-font-family-input")

const $boldCheckbox = $("bold-checkbox")

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

dispatchGetSetting().then(setting => {
    $currentFontFamily.textContent = setting.fontFamily

    $boldCheckbox.checked = setting.isBold

    $currentFontSize.textContent = setting.fontSizePx + "px"
    $fontSizeSlider.value = setting.fontSizePx

    $currentLetterSpacing.textContent = setting.letterSpacingEm + "em"
    $letterSpacingSlider.value = setting.letterSpacingEm

    $currentWordSpacing.textContent = setting.wordSpacingEm + "em"
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
function addFontList(family) {
    const $button = document.createElement("a")
    $button.textContent = family
    $button.style.fontFamily = family
    $button.addEventListener("click", () => {
        dispatchSetValue("fontFamily", family)
        $customFontFamilyInput.value = ""
        $currentFontFamily.textContent = family
    })
    $fontFamilySelect.appendChild($button)
}
dispatchGetAvailableFontFamilies().then(families => {
    families.forEach(addFontList)
})

// Input Event Handlers
$fontSizeSlider.addEventListener("input", () => {
    $currentFontSize.textContent = $fontSizeSlider.value + "px"
    dispatchSetValue("fontSizePx", $fontSizeSlider.value)
})

$boldCheckbox.addEventListener("change", () => {
    dispatchSetValue("isBold", $boldCheckbox.checked)
})

$letterSpacingSlider.addEventListener("input", () => {
    $currentLetterSpacing.textContent = $letterSpacingSlider.value + "em"
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

function dispatchSetValue(fieldName, value) {
    return dispatch("SET_VALUE", { fieldName, value })
}

function dispatchGetSetting() {
    return dispatch("GET_SETTING")
}

/**
 * @returns {Promise<String[]>}
 */
function dispatchGetAvailableFontFamilies() {
    return dispatch("GET_AVAILABLE_FONT_FAMILIES")
}

async function dispatch(action, payload = {}) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ "active": true, "lastFocusedWindow": true }, tabs => {
            const tab = tabs[0]
            chrome.tabs.sendMessage(tab.id, { action, payload }, resolve)
        })
    })
}