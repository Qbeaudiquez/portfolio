import { loadMode } from './loadMode.js'

export function initDarkmode(){
    const toggleContainer = document.querySelector(".toggleContainer")
    if(!toggleContainer) return

    toggleContainer.addEventListener("click", () => {
        const mode = toggleContainer.getAttribute("data-mode")
        localStorage.setItem("currentMode", mode);
        loadMode(mode)
    })
}