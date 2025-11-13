/**
 * Projet class - Represents a portfolio project
 */
export class Projet{
    /**
     * Create a new Projet instance
     * @param {string} title - Project title
     * @param {Object} description - Description object with 'petite' and 'grande' keys, each containing 'fr' and 'en'
     * @param {string} date - Project date
     * @param {Object} role - Role object with 'fr' and 'en' keys
     * @param {Object} missions - Missions object with 'fr' and 'en' keys
     * @param {string} url - Project URL
     * @param {string} mashup - Path to mashup image
     * @param {Array<Features>} features - Array of Features instances
     * @param {number} id - Project ID
     */
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

    /**
     * Get project description in specified language and size
     * @param {string} size - Size variant ('petite' or 'grande')
     * @param {string} lang - Language code ('fr' or 'en')
     * @returns {string} The description text
     */
    getDescription(size = 'petite', lang = 'fr'){
        return this.description[size]?.[lang] || ''
    }

    getDate(){
        return this.date
    }

    /**
     * Get project role in specified language
     * @param {string} lang - Language code ('fr' or 'en')
     * @returns {string} The role text
     */
    getRole(lang = 'fr'){
        return this.role[lang] || ''
    }

    /**
     * Get project missions in specified language
     * @param {string} lang - Language code ('fr' or 'en')
     * @returns {string} The missions text
     */
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