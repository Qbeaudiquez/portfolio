export function initBouncingBalls() {
    const cadre = document.querySelector('.cadre')
    if (!cadre) return

    // Créer le conteneur pour les boules
    const ballsContainer = document.createElement('div')
    ballsContainer.classList.add('ballsContainer')
    cadre.appendChild(ballsContainer)

    // Fonction pour déterminer le nombre de boules selon la largeur d'écran
    function getBallCount() {
        const windowWidth = window.innerWidth
        if (windowWidth >= 1280) return 20 // Grand écran
        if (windowWidth >= 768) return 15 // Moyen écran
        return 10 // Petit écran
    }

    // Fonction pour générer la configuration des boules
    function generateBallsConfig(count) {
        const colors = [
            { color: 'var(--first-light-color)', darkColor: 'var(--first-dark-color)' },
            { color: 'var(--second-light-color)', darkColor: 'var(--second-dark-color)' },
            { color: 'var(--third-light-color)', darkColor: 'var(--third-dark-color)' }
        ]
        
        const config = []
        for (let i = 0; i < count; i++) {
            config.push(colors[i % 3])
        }
        return config
    }

    // Paramètres
    const baseVelocity = 2 // Vitesse fixe pour toutes les tailles d'écran

    // Fonction pour calculer la taille des boules en fonction de la largeur de la fenêtre
    function calculateBallSize() {
        const windowWidth = window.innerWidth
        // Taille augmente avec la largeur : 40px à 800px, jusqu'à 100px à 1920px
        const size = Math.max(40, Math.min(100, (windowWidth / 1920) * 100))
        return size
    }

    let currentBallSize = calculateBallSize()
    let currentVelocity = baseVelocity
    let ballsConfig = generateBallsConfig(getBallCount())

    // Créer les boules avec leurs propriétés
    let balls = ballsConfig.map((config, index) => {
        const ball = document.createElement('div')
        ball.classList.add('bouncingBall')
        ball.style.width = `${currentBallSize}px`
        ball.style.height = `${currentBallSize}px`
        ball.style.backgroundColor = config.color
        ball.setAttribute('data-light-color', config.color)
        ball.setAttribute('data-dark-color', config.darkColor)
        
        ballsContainer.appendChild(ball)

        // Position initiale aléatoire
        const bounds = cadre.getBoundingClientRect()
        return {
            element: ball,
            x: Math.random() * (bounds.width - currentBallSize),
            y: Math.random() * (bounds.height - currentBallSize),
            vx: (Math.random() - 0.5) * currentVelocity * 2,
            vy: (Math.random() - 0.5) * currentVelocity * 2,
            lightColor: config.color,
            darkColor: config.darkColor
        }
    })

    // Fonction d'animation
    function animate() {
        const bounds = cadre.getBoundingClientRect()
        const isDarkMode = document.body.classList.contains('darkmodeActived')

        balls.forEach(ball => {
            // Mettre à jour la position
            ball.x += ball.vx
            ball.y += ball.vy

            // Rebond sur les bords
            if (ball.x <= 0 || ball.x >= bounds.width - currentBallSize) {
                ball.vx *= -1
                ball.x = Math.max(0, Math.min(ball.x, bounds.width - currentBallSize))
            }
            if (ball.y <= 0 || ball.y >= bounds.height - currentBallSize) {
                ball.vy *= -1
                ball.y = Math.max(0, Math.min(ball.y, bounds.height - currentBallSize))
            }

            // Appliquer la position
            ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`

            // Mettre à jour la couleur selon le mode
            if (isDarkMode) {
                ball.element.style.backgroundColor = ball.darkColor
            } else {
                ball.element.style.backgroundColor = ball.lightColor
            }
        })

        requestAnimationFrame(animate)
    }

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        const newBallSize = calculateBallSize()
        const newBallCount = getBallCount()
        
        // Mettre à jour la taille
        if (newBallSize !== currentBallSize) {
            currentBallSize = newBallSize
            
            balls.forEach(ball => {
                ball.element.style.width = `${currentBallSize}px`
                ball.element.style.height = `${currentBallSize}px`
                
                // Ajuster la position si nécessaire pour éviter les débordements
                const bounds = cadre.getBoundingClientRect()
                ball.x = Math.min(ball.x, bounds.width - currentBallSize)
                ball.y = Math.min(ball.y, bounds.height - currentBallSize)
            })
        }
        
        // Recréer les boules si le nombre a changé
        if (newBallCount !== balls.length) {
            // Supprimer toutes les boules existantes
            balls.forEach(ball => ball.element.remove())
            
            // Recréer avec le nouveau nombre
            ballsConfig = generateBallsConfig(newBallCount)
            balls = ballsConfig.map((config, index) => {
                const ball = document.createElement('div')
                ball.classList.add('bouncingBall')
                ball.style.width = `${currentBallSize}px`
                ball.style.height = `${currentBallSize}px`
                ball.style.backgroundColor = config.color
                ball.setAttribute('data-light-color', config.color)
                ball.setAttribute('data-dark-color', config.darkColor)
                
                ballsContainer.appendChild(ball)

                const bounds = cadre.getBoundingClientRect()
                return {
                    element: ball,
                    x: Math.random() * (bounds.width - currentBallSize),
                    y: Math.random() * (bounds.height - currentBallSize),
                    vx: (Math.random() - 0.5) * currentVelocity * 2,
                    vy: (Math.random() - 0.5) * currentVelocity * 2,
                    lightColor: config.color,
                    darkColor: config.darkColor
                }
            })
        }
    })

    // Démarrer l'animation
    animate()

    // Observer les changements de mode
    const observer = new MutationObserver(() => {
        const isDarkMode = document.body.classList.contains('darkmodeActived')
        balls.forEach(ball => {
            ball.element.style.backgroundColor = isDarkMode ? ball.darkColor : ball.lightColor
        })
    })

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    })
}
