/**
 * Initialize and animate bouncing balls background effect
 * Creates responsive animated balls that bounce around the screen
 */
export function initBouncingBalls() {
    const cadre = document.querySelector('.cadre')
    if (!cadre) return

    // Create container for the balls
    const ballsContainer = document.createElement('div')
    ballsContainer.classList.add('ballsContainer')
    cadre.appendChild(ballsContainer)

    /**
     * Determine number of balls based on screen width
     * @returns {number} Number of balls to display
     */
    function getBallCount() {
        const windowWidth = window.innerWidth
        if (windowWidth >= 1280) return 20 // Large screen
        if (windowWidth >= 768) return 15 // Medium screen
        return 10 // Small screen
    }

    /**
     * Generate configuration for all balls
     * @param {number} count - Number of balls to create
     * @returns {Array} Array of color configurations
     */
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

    // Parameters
    const baseVelocity = 2 // Fixed velocity for all screen sizes

    /**
     * Calculate ball size based on window width
     * @returns {number} Ball size in pixels
     */
    function calculateBallSize() {
        const windowWidth = window.innerWidth
        // Size increases with width: 40px at 800px, up to 100px at 1920px
        const size = Math.max(40, Math.min(100, (windowWidth / 1920) * 100))
        return size
    }

    let currentBallSize = calculateBallSize()
    let currentVelocity = baseVelocity
    let ballsConfig = generateBallsConfig(getBallCount())

    // Create balls with their properties
    let balls = ballsConfig.map((config, index) => {
        const ball = document.createElement('div')
        ball.classList.add('bouncingBall')
        ball.style.width = `${currentBallSize}px`
        ball.style.height = `${currentBallSize}px`
        ball.style.backgroundColor = config.color
        ball.setAttribute('data-light-color', config.color)
        ball.setAttribute('data-dark-color', config.darkColor)
        
        ballsContainer.appendChild(ball)

        // Random initial position
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

    /**
     * Animation function - updates ball positions and handles collisions
     */
    function animate() {
        const bounds = cadre.getBoundingClientRect()
        const isDarkMode = document.body.classList.contains('darkmodeActived')

        balls.forEach(ball => {
            // Update position
            ball.x += ball.vx
            ball.y += ball.vy

            // Bounce off edges
            if (ball.x <= 0 || ball.x >= bounds.width - currentBallSize) {
                ball.vx *= -1
                ball.x = Math.max(0, Math.min(ball.x, bounds.width - currentBallSize))
            }
            if (ball.y <= 0 || ball.y >= bounds.height - currentBallSize) {
                ball.vy *= -1
                ball.y = Math.max(0, Math.min(ball.y, bounds.height - currentBallSize))
            }

            // Apply position
            ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`

            // Update color based on mode
            if (isDarkMode) {
                ball.element.style.backgroundColor = ball.darkColor
            } else {
                ball.element.style.backgroundColor = ball.lightColor
            }
        })

        requestAnimationFrame(animate)
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const newBallSize = calculateBallSize()
        const newBallCount = getBallCount()
        
        // Update size
        if (newBallSize !== currentBallSize) {
            currentBallSize = newBallSize
            
            balls.forEach(ball => {
                ball.element.style.width = `${currentBallSize}px`
                ball.element.style.height = `${currentBallSize}px`
                
                // Adjust position if needed to prevent overflow
                const bounds = cadre.getBoundingClientRect()
                ball.x = Math.min(ball.x, bounds.width - currentBallSize)
                ball.y = Math.min(ball.y, bounds.height - currentBallSize)
            })
        }
        
        // Recreate balls if count has changed
        if (newBallCount !== balls.length) {
            // Remove all existing balls
            balls.forEach(ball => ball.element.remove())
            
            // Recreate with new count
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

    // Start animation
    animate()

    // Observe mode changes
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
