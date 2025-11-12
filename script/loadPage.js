import { attachLinkListeners } from './attachLinkListeners.js'
import { renderProjets, renderProjetDetail } from './projetController.js'
import { translatePage } from './translations.js'

export async function loadPage(page, lang = 'fr') {
    const pageContent = document.querySelector(".pageContent")
    const backHomeText = document.querySelector(".backHomeText")
    const backHome = document.querySelector(".backHome")
    
    // Réinitialiser le contenu et les classes
    if(pageContent) {
        pageContent.innerHTML = ""
        // Supprimer toutes les classes spécifiques de page précédentes
        pageContent.className = 'pageContent'
        // Ajouter la classe spécifique à la page actuelle
        pageContent.classList.add(`${page}PageContent`)
    }

    const urlPage = `./html/pages/${page}.html`

    try {
        const response = await fetch(urlPage);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const content = await response.text()
        if(pageContent) pageContent.innerHTML = content
    } catch (error) {
        console.error("Erreur de chargement :", error)
        const errorText = lang === 'fr' ? "Erreur de chargement de la page." : "Page loading error."
        const linkText = lang === 'fr' ? "Retour à l'accueil" : "Back to home"
        if(pageContent) pageContent.innerHTML = `<p>${errorText}</p><br><a data-page="home" class="internalLink link">${linkText}</a>`
    }
        
    switch(page) {
        case "projets":
            if(backHome) {
                backHome.style.opacity = "1";
                backHome.setAttribute("data-page", "home");
            }
            if(backHomeText) backHomeText.innerHTML = lang === 'fr' ? "Accueil" : "Home";
            // Charger et afficher les projets
            await renderProjets(lang)
            break;
        case "about":
        case "contact":
            if(backHome) {
                backHome.style.opacity = "1";
                backHome.setAttribute("data-page", "home");
            }
            if(backHomeText) backHomeText.innerHTML = lang === 'fr' ? "Accueil" : "Home";
            break;
        case "projet":
            if(backHome) {
                backHome.style.opacity = "1";
                backHome.setAttribute("data-page", "projets");
            }
            if(backHomeText) backHomeText.innerHTML = lang === 'fr' ? "Retour" : "Back";
            // Charger et afficher le projet individuel
            const projetId = localStorage.getItem('currentProjetId')
            if (projetId) {
                await renderProjetDetail(projetId, lang)
            }
            break;
        default:
            if(backHome) backHome.style.opacity = "0";
            break;
    }

    // Traduire la page
    translatePage(page, lang)

    // Attach listeners to links inside the newly loaded content
    attachLinkListeners(loadPage)
}