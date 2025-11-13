    import { loadPage } from './loadPage.js'
    import { loadMode } from './loadMode.js'
    import { initDarkmode } from './darkmode.js'
    import { initBouncingBalls } from './bouncingBalls.js'
    import { initLanguage, getCurrentLang } from './language.js'

    window.addEventListener("load", async () => {
        const savedPage = localStorage.getItem("currentPage") || "home";
        const savedMode = localStorage.getItem("currentMode") || "light";
        const savedLang = localStorage.getItem("currentLang") || "fr";

        // Apply mode first so UI matches immediately
        loadMode(savedMode)
        // Wire mode toggling
        initDarkmode()

        // Initialize language system
        initLanguage()

        // Initialize bouncing balls
        initBouncingBalls()

        // Load the requested page (async)
        await loadPage(savedPage, savedLang)

        // Listen for custom navigation events
        window.addEventListener('navigate', async (e) => {
            const page = e.detail.page
            if (page) {
                await loadPage(page, getCurrentLang())
            }
        })

        // Listen for language change events
        window.addEventListener('languageChange', async (e) => {
            const { lang, page } = e.detail
            await loadPage(page, lang)
        })
    });