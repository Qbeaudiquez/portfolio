export class Projet{
    constructor(title,description = [], date, role, missions, url, mashup, features = []){
        this.title = title
        this.description = description
        this.date = date
        this.role = role
        this.missions = missions
        this.url = url
        this.mashup = mashup
        this.features = features
    }

    getTitle(lang){
        return this.title[lang]
    }

    getDescription(){
        return this.description[lang]
    }

    getRole(lang){
        return this.role[lang]
    }

    getMissions(lang){
        return this.missions[lang]
    }

    getUrl(lang){
        return this.url[lang]
    }

    getFeatures(){
        return this.features
        
    }

}