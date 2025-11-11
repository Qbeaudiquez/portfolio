import { Projet } from './class/classProjets.js'
import { Features } from './class/classFeatures.js'

export async function loadProjet(){
    try {
        const response = await fetch('../models/projet.json')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()

        return data.map((projet, index) => {
            // Créer l'objet Features à partir de l'objet features (pas un tableau dans le JSON)
            const features = new Features(
                projet.features.title,
                projet.features.details,
                projet.features.img
            )
            
            return new Projet(
                projet.title,
                projet.description,
                projet.date,
                projet.role,
                projet.mission,
                projet.url,
                projet.mashup,
                [features], // Array avec une seule feature
                index + 1 // ID du projet
            )
        })
    } catch (error) {
        console.error("Erreur lors du chargement des projets:", error)
        return []
    }
}