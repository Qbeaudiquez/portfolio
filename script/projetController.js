import { loadProjet } from './loadProjet.js'

// Variable pour stocker les projets chargés
let projetsCache = null
let lastProjetListContainer = null

export async function getProjets() {
    if (!projetsCache) {
        projetsCache = await loadProjet()
    }
    return projetsCache
}

export async function getProjetById(id) {
    const projets = await getProjets()
    return projets.find(p => p.getId() === parseInt(id))
}

export async function renderProjets(lang = 'fr') {
    const projets = await getProjets()
    const pageContent = document.querySelector('.projetsPageContent')
    
    if (!pageContent) {
        console.error("Container .projetsPageContent non trouvé")
        return
    }

    // Créer la structure avec previewProjet et projetList
    const projetsWrapper = document.createElement('div')
    projetsWrapper.classList.add('projetsWrapper')
    
    const previewProjet = document.createElement('div')
    previewProjet.classList.add('previewProjet')
    
    const projetListContainer = document.createElement('div')
    projetListContainer.classList.add('projetList')
    
    // Assembler la structure
    projetsWrapper.appendChild(previewProjet)
    projetsWrapper.appendChild(projetListContainer)
    
    // Vider le pageContent et ajouter la nouvelle structure (après le titre)
    const title = pageContent.querySelector('.title')
    pageContent.innerHTML = ''
    if (title) {
        pageContent.appendChild(title)
    }
    pageContent.appendChild(projetsWrapper)

    // Créer une carte pour chaque projet
    projets.forEach(projet => {
        const projetCard = createProjetCard(projet, lang, previewProjet)
        const seperateCard = document.createElement('div')
        seperateCard.classList.add('separateCard')
        
        projetListContainer.appendChild(projetCard)
        projetListContainer.appendChild(seperateCard)
    })

    // Ajouter le listener seulement si c'est un nouveau conteneur
    if (lastProjetListContainer !== projetListContainer) {
        projetListContainer.addEventListener('click', (e) => {
            const projetCard = e.target.closest('.projetContainer')
            if (projetCard) {
                // Ajouter la classe hover pour l'effet visuel sur mobile
                projetCard.classList.add('mobile-hover')
                
                // Attendre 300ms avant de naviguer
                setTimeout(() => {
                    const projetId = projetCard.querySelector('.idProjet').textContent
                    localStorage.setItem('currentProjetId', projetId)
                    localStorage.setItem('currentPage', 'projet')
                    
                    const event = new CustomEvent('navigate', { detail: { page: 'projet' } })
                    window.dispatchEvent(event)
                }, 300)
            }
        })
        lastProjetListContainer = projetListContainer
    }
}

export async function renderProjetDetail(projetId, lang = 'fr') {
    const projet = await getProjetById(projetId)
    
    if (!projet) {
        console.error(`Projet avec l'ID ${projetId} non trouvé`)
        return
    }

    // Remplir le titre
    const titleElement = document.querySelector('.containerTitle .title')
    if (titleElement) {
        titleElement.textContent = projet.getTitle()
    }

    // Remplir la description (grande)
    const descriptionElement = document.querySelector('.infoContainer .desciption')
    if (descriptionElement) {
        descriptionElement.textContent = projet.getDescription('grande', lang)
    }

    // Remplir le rôle
    const roleContentElement = document.querySelector('.roleContainer .roleContent')
    if (roleContentElement) {
        roleContentElement.textContent = projet.getRole(lang)
    }

    // Remplir la mission
    const missionContentElement = document.querySelector('.missionContainer .missionContent')
    if (missionContentElement) {
        missionContentElement.textContent = projet.getMissions(lang)
    }

    // Remplir l'URL
    const urlContentElement = document.querySelector('.urlContainer .urlContent')
    if (urlContentElement) {
        urlContentElement.href = projet.getUrl()
        urlContentElement.textContent = projet.getUrl()
    }

    // Afficher le mashup
    const mashupElement = document.querySelector('.mashup')
    if (mashupElement && projet.getMashup()) {
        const img = document.createElement('img')
        img.src = `../${projet.getMashup()}`
        img.alt = `Mashup ${projet.getTitle()}`
        mashupElement.innerHTML = ''
        mashupElement.appendChild(img)
    }

    // Afficher les features
    renderFeatures(projet.getFeatures(), lang)
}

function renderFeatures(features, lang = 'fr') {
    const featuresContainer = document.querySelector('.featuresContainer')
    
    if (!featuresContainer) {
        console.error("Container .featuresContainer non trouvé")
        return
    }

    featuresContainer.innerHTML = ''

    features.forEach(feature => {
        const featureElement = createFeatureElement(feature, lang)
        featuresContainer.appendChild(featureElement)
    })
}

function createFeatureElement(feature, lang = 'fr') {
    const featureContainer = document.createElement('div')
    featureContainer.classList.add('featureContainer')

    // Nom de la feature
    const featureName = document.createElement('h3')
    featureName.classList.add('featureName')
    featureName.textContent = feature.getTitle(lang)

    // Description de la feature
    const featureDescription = document.createElement('p')
    featureDescription.classList.add('featureDesciption')
    featureDescription.textContent = feature.getDetails(lang)

    // Image de la feature
    const featureImgContainer = document.createElement('div')
    featureImgContainer.classList.add('featureImg')
    
    if (feature.getImg()) {
        const img = document.createElement('img')
        img.src = `../${feature.getImg()}`
        img.alt = feature.getTitle(lang)
        featureImgContainer.appendChild(img)
    }

    featureContainer.appendChild(featureName)
    featureContainer.appendChild(featureDescription)
    featureContainer.appendChild(featureImgContainer)

    return featureContainer
}

function createProjetCard(projet, lang = 'fr', previewProjet) {
    // Créer le conteneur principal
    const projetContainer = document.createElement('div')
    projetContainer.classList.add('projetContainer')

    // Conteneur ID
    const idContainer = document.createElement('div')
    idContainer.classList.add('idContainer')
    const idProjet = document.createElement('p')
    idProjet.classList.add('idProjet')
    idProjet.textContent = projet.getId()
    idContainer.appendChild(idProjet)

    // Conteneur de contenu
    const contentContainer = document.createElement('div')
    contentContainer.classList.add('contentContainer')
    
    const projetTitle = document.createElement('h3')
    projetTitle.classList.add('projetTitle')
    projetTitle.textContent = projet.getTitle()
    
    const projetDescription = document.createElement('p')
    projetDescription.classList.add('projetDescription')
    projetDescription.textContent = projet.getDescription('petite', lang)
    
    contentContainer.appendChild(projetTitle)
    contentContainer.appendChild(projetDescription)

    // Conteneur de date
    const dateContainer = document.createElement('div')
    dateContainer.classList.add('dateContainer')
    const date = document.createElement('p')
    date.classList.add('date')
    date.textContent = projet.getDate()
    dateContainer.appendChild(date)

    // Assembler la carte
    projetContainer.appendChild(idContainer)
    projetContainer.appendChild(contentContainer)
    projetContainer.appendChild(dateContainer)

    // Ajouter les événements hover pour afficher le mashup (uniquement si > 850px)
    if (previewProjet) {
        projetContainer.addEventListener('mouseenter', () => {
            if (window.innerWidth > 850 && projet.getMashup()) {
                previewProjet.innerHTML = ''
                const img = document.createElement('img')
                img.src = projet.getMashup()
                img.alt = `Mashup ${projet.getTitle()}`
                img.classList.add('mashupPreview')
                previewProjet.appendChild(img)
                previewProjet.classList.add('visible')
            }
        })

        projetContainer.addEventListener('mouseleave', () => {
            if (window.innerWidth > 850) {
                previewProjet.classList.remove('visible')
                // Vider le contenu après la transition
                setTimeout(() => {
                    if (!previewProjet.classList.contains('visible')) {
                        previewProjet.innerHTML = ''
                    }
                }, 300) // Correspond à la durée de la transition CSS
            }
        })
    }

    return projetContainer
}
