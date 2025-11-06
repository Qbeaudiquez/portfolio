async function loadPage(page) {
    const pageContent = document.querySelector(".pageContent")
    pageContent.innerHTML = ""

    const urlPage = `./pages/${page}.html`

    try {
        const response = await fetch(urlPage);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const content = await response.text()
        pageContent.innerHTML = content
    } catch (error) {
        console.error("Erreur de chargement :", error)
        pageContent.innerHTML = "<p>Erreur de chargement de la page.</p>"
    }
}