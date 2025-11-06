const menuBurgerContainer = document.querySelector(".menuBurgerContainer")

menuBurgerContainer.addEventListener("click", () => {
    const menuLinks = document.querySelector(".menuLinks")
    const rings = document.querySelectorAll(".ring")
    const name = document.querySelector(".name")

    rings.forEach(ring => {
        ring.classList.toggle("actived")
    });

    menuLinks.classList.toggle("actived")
    name.classList.toggle("actived")

})

