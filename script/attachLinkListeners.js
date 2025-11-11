export function attachLinkListeners(onNavigate){
    const links = document.querySelectorAll(".internalLink")

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const menuLinks = document.querySelector(".menuLinks")
            const rings = document.querySelectorAll(".ring")

            rings.forEach(ring => {
                ring.classList.remove("actived")
            });

            if(menuLinks) menuLinks.classList.remove("actived")
            const page = link.getAttribute("data-page")
            localStorage.setItem("currentPage", page);
            if(typeof onNavigate === 'function') onNavigate(page)
        })
    });
}
