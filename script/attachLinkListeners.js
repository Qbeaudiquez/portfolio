import { getCurrentLang } from './language.js'

/**
 * Handle click event on internal links
 * @param {Event} e - Click event
 * @param {Function} onNavigate - Callback function for navigation
 */
function handleLinkClick(e, onNavigate) {
    e.preventDefault();
    
    const page = e.currentTarget.getAttribute("data-page")
    const currentLang = getCurrentLang()
    localStorage.setItem("currentPage", page);
    if(typeof onNavigate === 'function') onNavigate(page, currentLang)
}

/**
 * Attach click listeners to all internal navigation links
 * @param {Function} onNavigate - Callback function for navigation
 */
export function attachLinkListeners(onNavigate){
    const links = document.querySelectorAll(".internalLink")

    links.forEach(link => {
        // Remove any existing listener before adding a new one
        // Use cloneNode to remove all event listeners
        const newLink = link.cloneNode(true)
        link.parentNode.replaceChild(newLink, link)
        
        // Add the new listener
        newLink.addEventListener("click", (e) => handleLinkClick(e, onNavigate))
    });
}