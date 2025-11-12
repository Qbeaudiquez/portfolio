import { getCurrentLang } from './language.js'

// Fonction pour gérer le clic sur un lien
function handleLinkClick(e, onNavigate) {
    e.preventDefault();
    
    const page = e.currentTarget.getAttribute("data-page")
    const currentLang = getCurrentLang()
    localStorage.setItem("currentPage", page);
    if(typeof onNavigate === 'function') onNavigate(page, currentLang)
}

export function attachLinkListeners(onNavigate){
    const links = document.querySelectorAll(".internalLink")

    links.forEach(link => {
        // Retirer tout ancien listener avant d'en ajouter un nouveau
        // On utilise cloneNode pour supprimer tous les event listeners
        const newLink = link.cloneNode(true)
        link.parentNode.replaceChild(newLink, link)
        
        // Ajouter le nouveau listener
        newLink.addEventListener("click", (e) => handleLinkClick(e, onNavigate))
    });
}