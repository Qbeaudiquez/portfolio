import { Projet } from './class/classProjets.js'
import { Features } from './class/classFeatures.js'

export async function loadProjet(){
    try {
        const response = await fetch("./models/projet.json")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()

        return data.map((projet, index) => {
            // Gérer les features : soit un objet unique (ancien format), soit un tableau
            let featuresArray = []
            
            if (Array.isArray(projet.features)) {
                // Nouveau format : tableau de features
                featuresArray = projet.features.map(feature => 
                    new Features(
                        feature.title,
                        feature.details,
                        feature.img
                    )
                )
            } else {
                // Ancien format : objet unique
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
                index + 1 // ID du projet
            )
        })
    } catch (error) {
        console.error("Erreur lors du chargement des projets:", error)
        return []
    }
}