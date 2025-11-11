    import { loadPage } from './loadPage.js'
    import { loadMode } from './loadMode.js'
    import { initDarkmode } from './darkmode.js'
    import { initBurgerMenu } from './burgerMenu.js'

    window.addEventListener("load", async () => {
        const savedPage = localStorage.getItem("currentPage") || "home";
        const savedMode = localStorage.getItem("currentMode") || "light";

        // Apply mode first so UI matches immediately
        loadMode(savedMode)
        // Wire mode toggling
        initDarkmode()

        // Initialize burger/menu interaction
        initBurgerMenu()

        // Load the requested page (async)
        await loadPage(savedPage)

        // Écouter les événements de navigation personnalisés
        window.addEventListener('navigate', async (e) => {
            const page = e.detail.page
            if (page) {
                await loadPage(page)
            }
        })
    });