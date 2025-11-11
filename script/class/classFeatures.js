export class Features{
    constructor(title,details, img){
        this.title = title
        this.details = details
        this.img = img
    }

    getTitle(lang = "fr"){
        return this.title[lang]
    }

    getDetails(lang = "fr"){
        return this.details[lang]
    }
    
}