/**
 * Features class - Represents a feature of a project
 */
export class Features{
    /**
     * Create a new Features instance
     * @param {Object} title - Title object with 'fr' and 'en' keys
     * @param {Object} details - Details object with 'fr' and 'en' keys
     * @param {string} img - Path to feature image
     */
    constructor(title, details, img){
        this.title = title
        this.details = details
        this.img = img
    }

    /**
     * Get feature title in specified language
     * @param {string} lang - Language code ('fr' or 'en')
     * @returns {string} The feature title
     */
    getTitle(lang = "fr"){
        return this.title[lang]
    }

    /**
     * Get feature details in specified language
     * @param {string} lang - Language code ('fr' or 'en')
     * @returns {string} The feature details
     */
    getDetails(lang = "fr"){
        return this.details[lang]
    }

    getImg(){
        return this.img
    }
}