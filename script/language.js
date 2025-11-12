export function initLanguage() {
    const langButton = document.querySelector(".langue")
    if (!langButton) return

    // Récupérer la langue sauvegardée ou utiliser 'fr' par défaut
    const savedLang = localStorage.getItem("currentLang") || "fr"
    updateLanguageButton(langButton, savedLang)
    
    langButton.addEventListener("click", () => {
        const currentLang = localStorage.getItem("currentLang") || "fr"
        const newLang = currentLang === "fr" ? "en" : "fr"
        
        localStorage.setItem("currentLang", newLang)
        updateLanguageButton(langButton, newLang)
        
        // Recharger le contenu de la page avec la nouvelle langue
        reloadPageContent(newLang)
    })
}

function updateLanguageButton(button, lang) {
    // Afficher la langue opposée (celle vers laquelle on peut switcher)
    button.textContent = lang === "fr" ? "EN" : "FR"
}

function reloadPageContent(lang) {
    const currentPage = localStorage.getItem('currentPage') || 'home'
    
    // Dispatcher un événement pour recharger le contenu de la page
    const event = new CustomEvent('languageChange', { detail: { lang, page: currentPage } })
    window.dispatchEvent(event)
}

export function getCurrentLang() {
    return localStorage.getItem("currentLang") || "fr"
}
