export const translations = {
    home: {
        fr: {
            title: "Bienvenue",
            name: "QUENTIN BEAUDIQUEZ",
            role: "Développeur Web Full Stack",
            description: "Passionné par la création d'expériences web",
            modern: "modernes",
            intuitive: "intuitives",
            intro1: "Je m'appelle",
            intro2: "Étudiant",
            cta1: "Découvrez mes projets",
            cta2: "En savoir plus sur moi",
            cta3: "Contactez-moi"
        },
        en: {
            title: "Welcome",
            name: "QUENTIN BEAUDIQUEZ",
            role: "Full Stack Web Developer",
            description: "Passionate about creating web experiences",
            modern: "modern",
            intuitive: "intuitive",
            intro1: "My name is",
            intro2: "Student",
            cta1: "Discover my projects",
            cta2: "Learn more about me",
            cta3: "Contact me"
        }
    },
    about: {
        fr: {
            title: "À propos",
            greeting: "Bonjour, je m'appelle Quentin Beaudiquez",
            role: "Développeur web et mobile en formation",
            description: "Passionné par la création d'expériences numériques simples et élégantes, j'aime transformer des idées en projets concrets à travers le code.",
            journeyTitle: "Mon parcours",
            journeyPara1: "J'ai suivi une formation de développeur web et web mobile chez Live Campus, où j'ai appris à concevoir des interfaces, manipuler des bases de données, et mettre en ligne des applications complètes.",
            journeyPara2: "Actuellement en Bachelor Développeur Web Full Stack, je continue d'explorer les technologies modernes comme Docker, PHP, JavaScript ou MongoDB à travers mes projets personnels.",
            skillsTitle: "Compétences & Outils",
            frontend: "Front-end",
            backend: "Back-end",
            environment: "Environnement",
            tools: "Outils",
            skillsPhilosophy: "Je privilégie un code clair et maintenable, et j'aime comprendre la logique métier derrière chaque fonctionnalité.",
            visionTitle: "Ma vision du travail",
            visionPoint1: "J'aime créer des interfaces à la fois esthétiques et intuitives.",
            visionPoint2: "Pour moi, un bon projet est avant tout une expérience fluide pour l'utilisateur.",
            visionPoint3: "J'apprécie particulièrement les environnements collaboratifs et l'apprentissage continu.",
            outsideTitle: "En dehors du code",
            outsideText: "J'aime le sport,la cuisine, les jeux vidéos, et les voyages.",
            ctaTitle: "Tu veux en savoir plus ou collaborer sur un projet ?",
            ctaContact: "Contacte-moi",
            ctaCV: "Télécharge mon CV"
        },
        en: {
            title: "About",
            greeting: "Hello, my name is Quentin Beaudiquez",
            role: "Web and mobile developer in training",
            description: "Passionate about creating simple and elegant digital experiences, I love transforming ideas into concrete projects through code.",
            journeyTitle: "My journey",
            journeyPara1: "I completed a Web and Mobile Web Development training at Live Campus, where I learned to design interfaces, work with databases, and deploy complete applications.",
            journeyPara2: "Currently enrolled in a Bachelor's in Full Stack Web Development, I continue to explore modern technologies like Docker, PHP, JavaScript, and MongoDB through personal projects.",
            skillsTitle: "Skills & Tools",
            frontend: "Front-end",
            backend: "Back-end",
            environment: "Environment",
            tools: "Tools",
            skillsPhilosophy: "I favor clear and maintainable code, and I like to understand the business logic behind each functionality.",
            visionTitle: "My work vision",
            visionPoint1: "I enjoy creating interfaces that are both beautiful and intuitive.",
            visionPoint2: "For me, a good project is above all a smooth experience for the user.",
            visionPoint3: "I particularly appreciate collaborative environments and continuous learning.",
            outsideTitle: "Outside of code",
            outsideText: "I enjoy sports,cooking, video games, and travel.",
            ctaTitle: "Want to know more or collaborate on a project?",
            ctaContact: "Contact me",
            ctaCV: "Download my CV"
        }
    },
    contact: {
        fr: {
            title: "Contact",
            greeting: "Merci d'être arrivé jusqu'ici",
            introText: "Si tu souhaites discuter d'un projet, poser une question ou simplement échanger, je serai ravi de vous lire. J'aime échanger avec des personnes curieuses, créatives et passionnées. Si mon univers t'a plu, n'hésite pas à me laisser un message.",
            methodsTitle: "Comment me joindre ?",
            emailLabel: "Email",
            emailDesc: "Le moyen le plus direct pour me joindre.",
            linkedinLabel: "LinkedIn",
            linkedinLink: "Voir mon profil",
            linkedinDesc: "Pour un échange professionnel ou une opportunité.",
            githubLabel: "GitHub",
            githubLink: "Découvrir mes projets",
            githubDesc: "Pour découvrir mon code et mes projets techniques.",
            phoneLabel: "Téléphone",
            phoneDesc: "Pour un échange direct et personnel.",
            contactNote: "Je réponds toujours avec plaisir, même à un simple message de curiosité.",
            ctaTitle: "Envie de me parler d'un projet, d'une idée ou d'une collaboration ?",
            ctaText: "Écris-moi, et voyons ensemble ce qu'on peut créer."
        },
        en: {
            title: "Contact",
            greeting: "Thank you for making it this far",
            introText: "If you want to discuss a project, ask a question or simply chat, I would be happy to read from you. I love exchanging with curious, creative and passionate people. If you enjoyed my universe, don't hesitate to leave me a message.",
            methodsTitle: "How to reach me?",
            emailLabel: "Email",
            emailDesc: "The most direct way to reach me.",
            linkedinLabel: "LinkedIn",
            linkedinLink: "View my profile",
            linkedinDesc: "For a professional exchange or an opportunity.",
            githubLabel: "GitHub",
            githubLink: "Discover my projects",
            githubDesc: "To discover my code and technical projects.",
            phoneLabel: "Phone",
            phoneDesc: "For a direct and personal exchange.",
            contactNote: "I always respond with pleasure, even to a simple message of curiosity.",
            ctaTitle: "Want to talk to me about a project, an idea or a collaboration?",
            ctaText: "Write to me, and let's see what we can create together."
        }
    },
    projets: {
        fr: {
            title: "Projets"
        },
        en: {
            title: "Projects"
        }
    },
    projet: {
        fr: {
            role: "Rôle",
            missions: "Missions",
            url: "Url"
        },
        en: {
            role: "Role",
            missions: "Missions",
            url: "Url"
        }
    }
}

export function translatePage(page, lang) {
    const pageTrans = translations[page]
    if (!pageTrans || !pageTrans[lang]) return

    const trans = pageTrans[lang]

    // Traduire les éléments avec data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate')
        if (trans[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = trans[key]
            } else {
                element.textContent = trans[key]
            }
        }
    })
}
