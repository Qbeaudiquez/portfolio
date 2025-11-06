function attachLinkListeners(){
    const links = document.querySelectorAll(".internalLink")

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const menuLinks = document.querySelector(".menuLinks")
            const rings = document.querySelectorAll(".ring")

            rings.forEach(ring => {
                ring.classList.remove("actived")
            });

            menuLinks.classList.remove("actived")
            page = link.getAttribute("data-page")
            localStorage.setItem("currentPage", page);
            loadPage(page)
            console.log(page)
            })

        

    });
}
