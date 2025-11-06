const menuBurgerContainer = document.querySelector(".menuBurgerContainer")

menuBurgerContainer.addEventListener("click", () => {
    const menuLinks = document.querySelector(".menuLinks")
    const rings = document.querySelectorAll(".ring")

    rings.forEach(ring => {
        ring.classList.toggle("actived")
    });

    menuLinks.classList.toggle("actived")
})

