export function loadMode(mode){
    const toggleContainer = document.querySelector(".toggleContainer")
    if(!toggleContainer) return

    if(mode === "light"){
        toggleContainer.setAttribute("data-mode", "dark")
        document.body.classList.add("darkmodeActived")
    }else if(mode === "dark"){
        toggleContainer.setAttribute("data-mode", "light")
        document.body.classList.remove("darkmodeActived")
    }
}