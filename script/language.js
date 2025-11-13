/**
 * Initialize the language switcher system
 * Sets up the language toggle button and event listeners
 */
export function initLanguage() {
    const langButton = document.querySelector(".langue")
    if (!langButton) return

    // Get saved language or default to 'fr'
    const savedLang = localStorage.getItem("currentLang") || "fr"
    updateLanguageButton(langButton, savedLang)
    
    langButton.addEventListener("click", () => {
        const currentLang = localStorage.getItem("currentLang") || "fr"
        const newLang = currentLang === "fr" ? "en" : "fr"
        
        localStorage.setItem("currentLang", newLang)
        updateLanguageButton(langButton, newLang)
        
        // Reload page content with new language
        reloadPageContent(newLang)
    })
}

/**
 * Update the language button display text
 * @param {HTMLElement} button - The language button element
 * @param {string} lang - Current language code ('fr' or 'en')
 */
function updateLanguageButton(button, lang) {
    // Display the opposite language (the one you can switch to)
    button.textContent = lang === "fr" ? "EN" : "FR"
}

/**
 * Reload the current page content with a new language
 * @param {string} lang - The language code to switch to
 */
function reloadPageContent(lang) {
    const currentPage = localStorage.getItem('currentPage') || 'home'
    
    // Dispatch an event to reload page content
    const event = new CustomEvent('languageChange', { detail: { lang, page: currentPage } })
    window.dispatchEvent(event)
}

/**
 * Get the currently selected language
 * @returns {string} The current language code ('fr' or 'en')
 */
export function getCurrentLang() {
    return localStorage.getItem("currentLang") || "fr"
}
