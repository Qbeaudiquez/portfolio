import { attachLinkListeners } from './attachLinkListeners.js'
import { renderProjets, renderProjetDetail } from './projetController.js'

export async function loadPage(page) {
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
        if(pageContent) pageContent.innerHTML = "<p>Erreur de chargement de la page.</p><br><a data-page=\"home\" class=\"internalLink link\">Retour à l'accueil</a>"
    }
        
    switch(page) {
        case "projets":
            if(backHome) {
                backHome.style.opacity = "1";
                backHome.setAttribute("data-page", "home");
            }
            if(backHomeText) backHomeText.innerHTML = "Accueil";
            // Charger et afficher les projets
            await renderProjets('fr')
            break;
        case "about":
        case "contact":
            if(backHome) {
                backHome.style.opacity = "1";
                backHome.setAttribute("data-page", "home");
            }
            if(backHomeText) backHomeText.innerHTML = "Accueil";
            break;
        case "projet":
            if(backHome) {
                backHome.style.opacity = "1";
                backHome.setAttribute("data-page", "projets");
            }
            if(backHomeText) backHomeText.innerHTML = "Retour";
            // Charger et afficher le projet individuel
            const projetId = localStorage.getItem('currentProjetId')
            if (projetId) {
                await renderProjetDetail(projetId, 'fr')
            }
            break;
        default:
            if(backHome) backHome.style.opacity = "0";
            break;
    }

    // Attach listeners to links inside the newly loaded content
    attachLinkListeners(loadPage)
}