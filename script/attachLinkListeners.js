// Fonction pour gérer le clic sur un lien
function handleLinkClick(e, onNavigate) {
    e.preventDefault();

    const menuLinks = document.querySelector(".menuLinks")
    const rings = document.querySelectorAll(".ring")
    const name = document.querySelector(".name")

    rings.forEach(ring => {
        ring.classList.remove("actived")
    });

    if(menuLinks) menuLinks.classList.remove("actived")
    if(name) name.classList.remove("actived")
    
    const page = e.currentTarget.getAttribute("data-page")
    localStorage.setItem("currentPage", page);
    if(typeof onNavigate === 'function') onNavigate(page)
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
