async function loadPage(page) {
    const pageContent = document.querySelector(".pageContent")
    const backHomeText = document.querySelector(".backHomeText")
    const backHome = document.querySelector(".backHome")
    pageContent.innerHTML = ""

    const urlPage = `./pages/${page}.html`

    try {
        const response = await fetch(urlPage);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const content = await response.text()
        pageContent.innerHTML = content
    } catch (error) {
        console.error("Erreur de chargement :", error)
        pageContent.innerHTML = "<p>Erreur de chargement de la page.</p><br><a data-page=\"home\" class=\"internalLink link\">Retour à l'accueil</a>"
    }
        
switch(page) {
    case "projets":
        backHome.style.opacity = "1";
        backHomeText.innerHTML = "Accueil";
        break;
    case "about":
        backHome.style.opacity = "1";
        backHomeText.innerHTML = "Accueil";
        break;
    case "contact":
        backHome.style.opacity = "1";
        backHomeText.innerHTML = "Accueil";
        break;
    case "projet":
        backHome.style.opacity = "1";
        backHomeText.innerHTML = "Retour";
        break;
    default:
        backHome.style.opacity = "0";
        break;
}
    attachLinkListeners()
}