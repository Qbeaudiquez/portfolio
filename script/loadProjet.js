import { Projet } from './class/classProjets.js'
import { Features } from './class/classFeatures.js'

/**
 * Load project data from JSON file and create Projet instances
 * @returns {Promise<Array<Projet>>} Array of project objects
 */
export async function loadProjet(){
    try {
        const response = await fetch("./models/projet.json")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()

        return data.map((projet, index) => {
            // Handle features: either a single object (old format) or an array
            let featuresArray = []
            
            if (Array.isArray(projet.features)) {
                // New format: array of features
                featuresArray = projet.features.map(feature => 
                    new Features(
                        feature.title,
                        feature.details,
                        feature.img
                    )
                )
            } else {
                // Old format: single object
                const features = new Features(
                    projet.features.title,
                    projet.features.details,
                    projet.features.img
                )
                featuresArray = [features]
            }
            
            return new Projet(
                projet.title,
                projet.description,
                projet.date,
                projet.role,
                projet.mission,
                projet.url,
                projet.mashup,
                featuresArray,
                index + 1 // Project ID
            )
        })
    } catch (error) {
        console.error("Error loading projects:", error)
        return []
    }
}