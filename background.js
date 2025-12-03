// State
let setting = {
    "fontFamily": "",
    "isBold": false,
    "fontSizePx": 0,
    "letterSpacingEm": 0,
    "wordSpacingEm": 0,
    "lineHeightScale": 0,
    "fontColorLevel": 0,
    "bgColorLevel": 255,
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
            // Add Google Font link if needed
            const googlefontUrl = FONT_FAMILY_TO_GOOGLE_FONT_URL.get(setting.fontFamily)
            if (googlefontUrl != undefined) {
                console.log("Add Google Font link:", googlefontUrl)
                const $ref = document.createElement("link")
                $ref.rel = "stylesheet"
                $ref.type = "text/css"
                $ref.href = googlefontUrl
                document.getElementsByTagName("head")[0].appendChild($ref)
            }
            break
        case "isBold":
            $cmeditor.style.fontWeight = setting.isBold ? "bold" : ""
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
    document.body.style.setProperty("--bg-accent-01", "orangered")
}


// Utilities
function setLineBorderTop(value) {
    const style = document.createElement('style')
    style.textContent = `.cm-line { border-top:${value} }`
    document.head.appendChild(style)
}
const FONTS = [
    ["Nunito Sans", "https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap"],
    ["Open Sans", "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"],
    ["PT Sans", "https://fonts.googleapis.com/css2?family=PT+Sans&display=swap"],
    ["Figtree", "https://fonts.googleapis.com/css2?family=Figtree:wght@300&display=swap"],
    ["TikTok Sans", "https://fonts.googleapis.com/css2?family=TikTok+Sans:opsz@12..36&display=swap"],
    ["Roboto", "https://fonts.googleapis.com/css2?family=Roboto&display=swap"],
    ["DM Sans", "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300&display=swap"],
    ["Mulish", "https://fonts.googleapis.com/css2?family=Mulish&display=swap"],
    // ["Baloo Thambi 2", "https://fonts.googleapis.com/css2?family=Baloo+Thambi+2&display=swap"],
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
    ["Shippori Mincho B1", "https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1&display=swap"],
    ["Zen Old Mincho", "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho&display=swap"],
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
    ["Zen Maru Gothic", "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap"],
    ["Klee One", "https://fonts.googleapis.com/css2?family=Klee+One&display=swap"],
    ["M PLUS 1", "https://fonts.googleapis.com/css2?family=M+PLUS+1&display=swap"],
]
const AVAILABLE_FONT_FAMILIES = FONTS.map(x => x[0])
const FONT_FAMILY_TO_GOOGLE_FONT_URL = new Map(FONTS)

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
        case "GET_AVAILABLE_FONT_FAMILIES":
            sendResponse(AVAILABLE_FONT_FAMILIES)
            break
        default:
            break
    }
})
console.log("Overleaf Font Customizer Background")