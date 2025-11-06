    window.addEventListener("load", () => {
    const savedPage = localStorage.getItem("currentPage");

    if (savedPage) {
        loadPage(savedPage);
    } else {
        loadPage("home");
    }
    
    const savedMode = localStorage.getItem("currentMode")

    if (savedMode) {
        loadMode(savedMode);
    } else {
        loadMode("light");
    }
});