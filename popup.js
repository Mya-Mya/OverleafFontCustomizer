// DOMs
const $fontSelect = document.getElementById("font-select")
const $customFontContainer = document.getElementById("custom-font-container")
const $customFontInput = document.getElementById("custom-font-input")
const $currentFont =  document.getElementById("current-font")
const $currentFontContainer =  document.getElementById("current-font-container")
// Startups
dispatch("GET_CURRENT_FONT").then(currentFont => {
    $currentFont.textContent = currentFont
})

// Handlers
$fontSelect.addEventListener("change", () => {
    $currentFontContainer.style.display = "none"

    if ($fontSelect.value === "other") {
        $customFontContainer.style.display = "block"
        $customFontInput.focus()
    } else {
        $customFontContainer.style.display = "none"
    }
    dispatchFontChange()
})
$customFontInput.addEventListener("input", dispatchFontChange)

// Utilities
function dispatchFontChange() {
    const fontFamily = $fontSelect.value === "other" ? $customFontInput.value : $fontSelect.value
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