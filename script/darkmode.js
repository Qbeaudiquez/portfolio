import { loadMode } from './loadMode.js'

/**
 * Initialize dark mode toggle functionality
 * Sets up event listener for the toggle container
 */
export function initDarkmode(){
    const toggleContainer = document.querySelector(".toggleContainer")
    if(!toggleContainer) return

    toggleContainer.addEventListener("click", () => {
        const mode = toggleContainer.getAttribute("data-mode")
        localStorage.setItem("currentMode", mode);
        loadMode(mode)
    })
}