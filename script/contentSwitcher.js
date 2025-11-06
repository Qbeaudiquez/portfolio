const links = document.querySelectorAll("a")

links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const pageContent = document.querySelector(".pageContent")
        pageContent.innerHTML = ""
        console.log("hello")

        const menuLinks = document.querySelector(".menuLinks")
        const rings = document.querySelectorAll(".ring")

        rings.forEach(ring => {
            ring.classList.remove("actived")
        });

        menuLinks.classList.remove("actived")
        })
});

