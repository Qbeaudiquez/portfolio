const toggleContainer = document.querySelector(".toggleContainer")

toggleContainer.addEventListener("click", () => {
    const mode = toggleContainer.getAttribute("data-mode")
    localStorage.setItem("currentMode", mode);
    loadMode(mode)

})