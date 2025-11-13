import { loadProjet } from './loadProjet.js'

// Variable to store loaded projects (cache)
let projetsCache = null
let lastProjetListContainer = null

/**
 * Get all projects (with caching)
 * @returns {Promise<Array<Projet>>} Array of project objects
 */
export async function getProjets() {
    if (!projetsCache) {
        projetsCache = await loadProjet()
    }
    return projetsCache
}

/**
 * Get a specific project by ID
 * @param {number} id - The project ID
 * @returns {Promise<Projet|undefined>} The project object or undefined
 */
export async function getProjetById(id) {
    const projets = await getProjets()
    return projets.find(p => p.getId() === parseInt(id))
}

/**
 * Render the projects list page
 * @param {string} lang - Language code ('fr' or 'en')
 */
export async function renderProjets(lang = 'fr') {
    const projets = await getProjets()
    const pageContent = document.querySelector('.projetsPageContent')
    
    if (!pageContent) {
        console.error("Container .projetsPageContent not found")
        return
    }

    // Create structure with previewProjet and projetList
    const projetsWrapper = document.createElement('div')
    projetsWrapper.classList.add('projetsWrapper')
    
    const previewProjet = document.createElement('div')
    previewProjet.classList.add('previewProjet')
    
    // Add default preview image on load
    const defaultImg = document.createElement('img')
    defaultImg.src = 'assets/defaultPreview.png'
    defaultImg.alt = 'Default preview'
    defaultImg.classList.add('mashupPreview')
    previewProjet.appendChild(defaultImg)
    
    const projetListContainer = document.createElement('div')
    projetListContainer.classList.add('projetList')
    
    // Assemble the structure
    projetsWrapper.appendChild(previewProjet)
    projetsWrapper.appendChild(projetListContainer)
    
    // Clear pageContent and add the new structure (after the title)
    const title = pageContent.querySelector('.title')
    pageContent.innerHTML = ''
    if (title) {
        pageContent.appendChild(title)
    }
    pageContent.appendChild(projetsWrapper)

    // Create a card for each project
    projets.forEach(projet => {
        const projetCard = createProjetCard(projet, lang, previewProjet)
        const seperateCard = document.createElement('div')
        seperateCard.classList.add('separateCard')
        
        projetListContainer.appendChild(projetCard)
        projetListContainer.appendChild(seperateCard)
    })

    // Add listener only if it's a new container
    if (lastProjetListContainer !== projetListContainer) {
        projetListContainer.addEventListener('click', (e) => {
            const projetCard = e.target.closest('.projetContainer')
            if (projetCard) {
                // Add hover class for visual effect on mobile
                projetCard.classList.add('mobile-hover')
                
                // Wait 300ms before navigating
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

/**
 * Render a single project detail page
 * @param {string} projetId - The project ID
 * @param {string} lang - Language code ('fr' or 'en')
 */
export async function renderProjetDetail(projetId, lang = 'fr') {
    const projet = await getProjetById(projetId)
    
    if (!projet) {
        console.error(`Project with ID ${projetId} not found`)
        return
    }

    // Fill the title
    const titleElement = document.querySelector('.containerTitle .title')
    if (titleElement) {
        titleElement.textContent = projet.getTitle()
    }

    // Fill the description (long version)
    const descriptionElement = document.querySelector('.infoContainer .desciption')
    if (descriptionElement) {
        descriptionElement.textContent = projet.getDescription('grande', lang)
    }

    // Fill the role
    const roleContentElement = document.querySelector('.roleContainer .roleContent')
    if (roleContentElement) {
        roleContentElement.textContent = projet.getRole(lang)
    }

    // Fill the mission
    const missionContentElement = document.querySelector('.missionContainer .missionContent')
    if (missionContentElement) {
        missionContentElement.textContent = projet.getMissions(lang)
    }

    // Fill the URL
    const urlContentElement = document.querySelector('.urlContainer .urlContent')
    if (urlContentElement) {
        urlContentElement.href = projet.getUrl()
        urlContentElement.textContent = projet.getUrl()
    }

    // Display the mashup
    const mashupElement = document.querySelector('.mashup')
    if (mashupElement && projet.getMashup()) {
        const img = document.createElement('img')
        img.src = `${projet.getMashup()}`
        img.alt = `Mashup ${projet.getTitle()}`
        mashupElement.innerHTML = ''
        mashupElement.appendChild(img)
    }

    // Display features
    renderFeatures(projet.getFeatures(), lang)
}

/**
 * Render the features section of a project
 * @param {Array<Features>} features - Array of feature objects
 * @param {string} lang - Language code ('fr' or 'en')
 */
function renderFeatures(features, lang = 'fr') {
    const featuresContainer = document.querySelector('.featuresContainer')
    
    if (!featuresContainer) {
        console.error("Container .featuresContainer not found")
        return
    }

    featuresContainer.innerHTML = ''

    features.forEach(feature => {
        const featureElement = createFeatureElement(feature, lang)
        featuresContainer.appendChild(featureElement)
    })
}

/**
 * Create a single feature element
 * @param {Features} feature - The feature object
 * @param {string} lang - Language code ('fr' or 'en')
 * @returns {HTMLElement} The feature container element
 */
function createFeatureElement(feature, lang = 'fr') {
    const featureContainer = document.createElement('div')
    featureContainer.classList.add('featureContainer')

    // Container for text (name + description)
    const featureContent = document.createElement('div')
    featureContent.classList.add('featureContent')

    // Feature name
    const featureName = document.createElement('h3')
    featureName.classList.add('featureName')
    featureName.textContent = feature.getTitle(lang)

    // Feature description
    const featureDescription = document.createElement('p')
    featureDescription.classList.add('featureDesciption')
    featureDescription.textContent = feature.getDetails(lang)

    // Feature image
    const featureImgContainer = document.createElement('div')
    featureImgContainer.classList.add('featureImg')
    
    if (feature.getImg()) {
        const img = document.createElement('img')
        img.src = `${feature.getImg()}`
        img.alt = feature.getTitle(lang)
        featureImgContainer.appendChild(img)
    }

    featureContent.appendChild(featureName)
    featureContent.appendChild(featureDescription)
    
    featureContainer.appendChild(featureContent)
    featureContainer.appendChild(featureImgContainer)

    return featureContainer
}

/**
 * Create a project card for the projects list
 * @param {Projet} projet - The project object
 * @param {string} lang - Language code ('fr' or 'en')
 * @param {HTMLElement} previewProjet - The preview container element
 * @returns {HTMLElement} The project card container
 */
function createProjetCard(projet, lang = 'fr', previewProjet) {
    // Create main container
    const projetContainer = document.createElement('div')
    projetContainer.classList.add('projetContainer')

    // ID container
    const idContainer = document.createElement('div')
    idContainer.classList.add('idContainer')
    const idProjet = document.createElement('p')
    idProjet.classList.add('idProjet')
    idProjet.textContent = projet.getId()
    idContainer.appendChild(idProjet)

    // Content container
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

    // Date container
    const dateContainer = document.createElement('div')
    dateContainer.classList.add('dateContainer')
    const date = document.createElement('p')
    date.classList.add('date')
    date.textContent = projet.getDate()
    dateContainer.appendChild(date)

    // Assemble the card
    projetContainer.appendChild(idContainer)
    projetContainer.appendChild(contentContainer)
    projetContainer.appendChild(dateContainer)

    // Add hover events to display mashup (only if > 850px)
    if (previewProjet) {
        projetContainer.addEventListener('mouseenter', () => {
            if (window.innerWidth > 850 && projet.getMashup()) {
                previewProjet.style.opacity = '0'
                setTimeout(() => {
                    previewProjet.innerHTML = ''
                    const img = document.createElement('img')
                    img.src = "./" + projet.getMashup()
                    img.alt = `Mashup ${projet.getTitle()}`
                    img.classList.add('mashupPreview')
                    previewProjet.appendChild(img)
                    previewProjet.style.opacity = '1'
                }, 300)
            }
        })

        projetContainer.addEventListener('mouseleave', () => {
            if (window.innerWidth > 850) {
                // Display default image after transition
                previewProjet.style.opacity = '0'
                setTimeout(() => {
                        previewProjet.innerHTML = ''
                        const defaultImg = document.createElement('img')
                        defaultImg.src = './assets/defaultPreview.png'
                        defaultImg.alt = 'Default preview'
                        defaultImg.classList.add('mashupPreview')
                        previewProjet.appendChild(defaultImg)
                        previewProjet.style.opacity = '1'
                // Matches the CSS transition duration
                }, 300)
            }
        })
    }

    return projetContainer
}
