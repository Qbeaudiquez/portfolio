export function initBurgerMenu(){
    const menuBurgerContainer = document.querySelector(".menuBurgerContainer")
    if(!menuBurgerContainer) return

    menuBurgerContainer.addEventListener("click", () => {
        const menuLinks = document.querySelector(".menuLinks")
        const rings = document.querySelectorAll(".ring")
        const name = document.querySelector(".name")

        rings.forEach(ring => {
            ring.classList.toggle("actived")
        });

        if(menuLinks) menuLinks.classList.toggle("actived")
        if(name) name.classList.toggle("actived")
    })
}