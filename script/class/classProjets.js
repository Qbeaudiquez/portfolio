export class Projet{
    constructor(title, description = {}, date, role, missions, url, mashup, features = [], id){
        this.id = id
        this.title = title
        this.description = description
        this.date = date
        this.role = role
        this.missions = missions
        this.url = url
        this.mashup = mashup
        this.features = features
    }

    getId(){
        return this.id
    }

    getTitle(){
        return this.title
    }

    getDescription(size = 'petite', lang = 'fr'){
        return this.description[size]?.[lang] || ''
    }

    getDate(){
        return this.date
    }

    getRole(lang = 'fr'){
        return this.role[lang] || ''
    }

    getMissions(lang = 'fr'){
        return this.missions[lang] || ''
    }

    getUrl(){
        return this.url
    }

    getMashup(){
        return this.mashup
    }

    getFeatures(){
        return this.features
    }
}