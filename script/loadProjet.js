import { Projet } from '../models/projet.js'
import { Features } from './class/classFeatures.js'

export async function loadProjet(){
    const reponse = await fetch('../models/projet.json')
    const data = await reponse.json()

    return data.map(projet => {
        const features = projet.features.map(feature => new Features(
            feature.title,
            feature.details,
            feature.img
        ))
        return new Projet(
            projet.title,
            projet.description,
            projet.date,
            projet.role,
            projet.missions,
            projet.url,
            projet.mashup,
            features
        )
    })
}