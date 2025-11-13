# Portfolio - Quentin Beaudiquez

[🇫🇷 Version Française](#français) | [🇬🇧 English Version](#english)

---

## Français

### 📋 Description

Portfolio personnel interactif développé en vanilla JavaScript. Application monopage (SPA) présentant mes projets, compétences et parcours professionnel avec un système de thème clair/sombre et une interface bilingue (français/anglais).

### ✨ Fonctionnalités

- **Navigation fluide** : SPA avec chargement dynamique des pages
- **Système de thème** : Mode clair et mode sombre avec transition douce
- **Multilingue** : Basculement instantané FR/EN avec persistance
- **Responsive** : Design adaptatif pour tous les écrans (mobile, tablette, desktop)
- **Animation** : Balles rebondissantes animées en arrière-plan
- **Projets dynamiques** : Chargement des projets depuis JSON avec support multilingue
- **Prévisualisation** : Aperçu des projets au survol (desktop)

### 🛠️ Technologies utilisées

#### Front-end
- **HTML5** : Structure sémantique
- **CSS3** : Styling avec variables CSS, animations, responsive design
- **JavaScript ES6+** : Modules, classes, async/await, DOM manipulation

#### Architecture
- **SPA (Single Page Application)** : Navigation sans rechargement
- **Programmation orientée objet** : Classes `Projet` et `Features`
- **Architecture modulaire** : Séparation des responsabilités en modules

#### Stockage
- **LocalStorage** : Persistance de la page courante, langue et thème
- **JSON** : Données des projets structurées et multilingues

### 📁 Structure du projet

```
Portfolio/
├── assets/                    # Images et ressources
│   ├── icon/                 # Icônes
│   ├── zooArcadia/          # Assets du projet Zoo Arcadia
│   ├── cozyNest/            # Assets du projet Cozy Nest
│   └── portfolio/           # Assets du projet Portfolio
├── html/
│   ├── index.html           # Point d'entrée de l'application
│   └── pages/               # Pages HTML individuelles
│       ├── home.html
│       ├── about.html
│       ├── contact.html
│       ├── projets.html
│       └── projet.html
├── script/
│   ├── app.js               # Point d'entrée JavaScript, initialisation
│   ├── attachLinkListeners.js  # Gestion des liens internes
│   ├── bouncingBalls.js     # Animation des balles rebondissantes
│   ├── darkmode.js          # Toggle du mode sombre
│   ├── language.js          # Système de changement de langue
│   ├── loadMode.js          # Application du thème
│   ├── loadPage.js          # Chargement dynamique des pages
│   ├── loadProjet.js        # Chargement des projets depuis JSON
│   ├── projetController.js  # Rendu des projets et détails
│   ├── translations.js      # Traductions statiques FR/EN
│   └── class/
│       ├── classProjets.js  # Classe Projet
│       └── classFeatures.js # Classe Features
├── style/
│   ├── main.css             # Styles globaux
│   ├── config.css           # Variables CSS (couleurs, polices)
│   ├── lightmode/           # Styles mode clair
│   │   ├── home.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── projets.css
│   │   └── projet.css
│   └── darkmode/            # Styles mode sombre
│       ├── darkmodeMain.css
│       ├── darkmodeHome.css
│       ├── darkmodeAbout.css
│       ├── darkmodeContact.css
│       ├── darkmodeProjets.css
│       └── darkmodeProjet.css
└── models/
    └── projet.json          # Données des projets

```

### 🚀 Installation et utilisation

#### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur local (Live Server, XAMPP, etc.) ou hébergement web

#### Installation
1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Qbeaudiquez/portfolio.git
   cd portfolio
   ```

2. Lancer avec un serveur local :
   - **VS Code** : Utiliser l'extension Live Server
   - **Python** : `python -m http.server 8000`
   - **Node.js** : `npx http-server`

3. Ouvrir dans le navigateur :
   ```
   http://localhost:8000
   ```

### 🎯 Architecture technique

#### Système de navigation
- **SPA** : Toutes les pages sont chargées dynamiquement via `fetch()`
- **Gestion d'état** : LocalStorage pour `currentPage`, `currentMode`, `currentLang`
- **Événements personnalisés** : `navigate` et `languageChange` pour communication entre modules

#### Système de thème
- **Variables CSS** : Définies dans `config.css`
- **Toggle dynamique** : Basculement de la classe `darkmodeActived` sur `<body>`
- **Persistance** : Sauvegarde automatique dans LocalStorage

#### Système multilingue
- **Fichier de traductions** : `translations.js` avec structure `{page: {lang: {key: value}}}`
- **Attribut data** : `data-translate="key"` sur les éléments HTML
- **Application dynamique** : Fonction `translatePage()` appelée après chaque chargement

#### Gestion des projets
- **Modèle de données** :
  ```json
  {
    "title": "Nom du projet",
    "description": {
      "petite": {"fr": "...", "en": "..."},
      "grande": {"fr": "...", "en": "..."}
    },
    "role": {"fr": "...", "en": "..."},
    "mission": {"fr": "...", "en": "..."},
    "features": [
      {
        "title": {"fr": "...", "en": "..."},
        "details": {"fr": "...", "en": "..."},
        "img": "./assets/..."
      }
    ]
  }
  ```
- **Classes** : `Projet` et `Features` pour encapsuler la logique métier
- **Rendu** : Génération DOM dynamique dans `projetController.js`

### 📝 Ajouter un nouveau projet

1. Modifier `models/projet.json` :
   ```json
   {
     "title": "Nouveau Projet",
     "description": {
       "petite": {
         "fr": "Description courte FR",
         "en": "Short description EN"
       },
       "grande": {
         "fr": "Description longue FR",
         "en": "Long description EN"
       }
     },
     "date": "01/01/2025",
     "role": {
       "fr": "Développeur Full Stack",
       "en": "Full Stack Developer"
     },
     "mission": {
       "fr": "Mission du projet...",
       "en": "Project mission..."
     },
     "url": "https://example.com",
     "mashup": "./assets/nouveauProjet/mashup.png",
     "features": [
       {
         "title": {"fr": "Fonctionnalité 1", "en": "Feature 1"},
         "details": {"fr": "Détails...", "en": "Details..."},
         "img": "./assets/nouveauProjet/features/feature1.png"
       }
     ]
   }
   ```

2. Ajouter les images dans `assets/nouveauProjet/`

### 🎨 Personnalisation

#### Couleurs
Modifier les variables dans `style/config.css` :
```css
:root {
    --main-color: #votre-couleur;
    --second-color: #votre-couleur;
    --first-light-color: #votre-couleur;
    /* etc. */
}
```

#### Polices
Modifier les imports dans `style/config.css` et les variables :
```css
@import url('https://fonts.googleapis.com/css2?family=VotrePolice');
--main-font: 'VotrePolice', sans-serif;
```

### 📄 Licence

Ce projet est libre de droits pour usage personnel. Pour toute utilisation commerciale, merci de me contacter.

### 📧 Contact

- **Email** : quentin.beaudiquez@gmail.com
- **LinkedIn** : [Quentin Beaudiquez](https://linkedin.com/in/quentin-beaudiquez)
- **GitHub** : [Qbeaudiquez](https://github.com/Qbeaudiquez)

---

## English

### 📋 Description

Interactive personal portfolio developed with vanilla JavaScript. Single Page Application (SPA) showcasing my projects, skills, and professional journey with a light/dark theme system and bilingual interface (French/English).

### ✨ Features

- **Smooth navigation**: SPA with dynamic page loading
- **Theme system**: Light and dark mode with smooth transitions
- **Multilingual**: Instant FR/EN switching with persistence
- **Responsive**: Adaptive design for all screens (mobile, tablet, desktop)
- **Animation**: Animated bouncing balls background
- **Dynamic projects**: Projects loaded from JSON with multilingual support
- **Preview**: Project preview on hover (desktop)

### 🛠️ Technologies used

#### Front-end
- **HTML5**: Semantic structure
- **CSS3**: Styling with CSS variables, animations, responsive design
- **JavaScript ES6+**: Modules, classes, async/await, DOM manipulation

#### Architecture
- **SPA (Single Page Application)**: Navigation without reload
- **Object-oriented programming**: `Projet` and `Features` classes
- **Modular architecture**: Separation of concerns in modules

#### Storage
- **LocalStorage**: Persistence of current page, language, and theme
- **JSON**: Structured multilingual project data

### 📁 Project structure

```
Portfolio/
├── assets/                    # Images and resources
│   ├── icon/                 # Icons
│   ├── zooArcadia/          # Zoo Arcadia project assets
│   ├── cozyNest/            # Cozy Nest project assets
│   └── portfolio/           # Portfolio project assets
├── html/
│   ├── index.html           # Application entry point
│   └── pages/               # Individual HTML pages
│       ├── home.html
│       ├── about.html
│       ├── contact.html
│       ├── projets.html
│       └── projet.html
├── script/
│   ├── app.js               # JavaScript entry point, initialization
│   ├── attachLinkListeners.js  # Internal links management
│   ├── bouncingBalls.js     # Bouncing balls animation
│   ├── darkmode.js          # Dark mode toggle
│   ├── language.js          # Language switching system
│   ├── loadMode.js          # Theme application
│   ├── loadPage.js          # Dynamic page loading
│   ├── loadProjet.js        # Projects loading from JSON
│   ├── projetController.js  # Projects and details rendering
│   ├── translations.js      # Static FR/EN translations
│   └── class/
│       ├── classProjets.js  # Projet class
│       └── classFeatures.js # Features class
├── style/
│   ├── main.css             # Global styles
│   ├── config.css           # CSS variables (colors, fonts)
│   ├── lightmode/           # Light mode styles
│   │   ├── home.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── projets.css
│   │   └── projet.css
│   └── darkmode/            # Dark mode styles
│       ├── darkmodeMain.css
│       ├── darkmodeHome.css
│       ├── darkmodeAbout.css
│       ├── darkmodeContact.css
│       ├── darkmodeProjets.css
│       └── darkmodeProjet.css
└── models/
    └── projet.json          # Project data

```

### 🚀 Installation and usage

#### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local server (Live Server, XAMPP, etc.) or web hosting

#### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Qbeaudiquez/portfolio.git
   cd portfolio
   ```

2. Launch with a local server:
   - **VS Code**: Use Live Server extension
   - **Python**: `python -m http.server 8000`
   - **Node.js**: `npx http-server`

3. Open in browser:
   ```
   http://localhost:8000
   ```

### 🎯 Technical architecture

#### Navigation system
- **SPA**: All pages loaded dynamically via `fetch()`
- **State management**: LocalStorage for `currentPage`, `currentMode`, `currentLang`
- **Custom events**: `navigate` and `languageChange` for module communication

#### Theme system
- **CSS Variables**: Defined in `config.css`
- **Dynamic toggle**: Toggling `darkmodeActived` class on `<body>`
- **Persistence**: Automatic saving to LocalStorage

#### Multilingual system
- **Translations file**: `translations.js` with structure `{page: {lang: {key: value}}}`
- **Data attribute**: `data-translate="key"` on HTML elements
- **Dynamic application**: `translatePage()` function called after each load

#### Project management
- **Data model**:
  ```json
  {
    "title": "Project name",
    "description": {
      "petite": {"fr": "...", "en": "..."},
      "grande": {"fr": "...", "en": "..."}
    },
    "role": {"fr": "...", "en": "..."},
    "mission": {"fr": "...", "en": "..."},
    "features": [
      {
        "title": {"fr": "...", "en": "..."},
        "details": {"fr": "...", "en": "..."},
        "img": "./assets/..."
      }
    ]
  }
  ```
- **Classes**: `Projet` and `Features` to encapsulate business logic
- **Rendering**: Dynamic DOM generation in `projetController.js`

### 📝 Adding a new project

1. Edit `models/projet.json`:
   ```json
   {
     "title": "New Project",
     "description": {
       "petite": {
         "fr": "Description courte FR",
         "en": "Short description EN"
       },
       "grande": {
         "fr": "Description longue FR",
         "en": "Long description EN"
       }
     },
     "date": "01/01/2025",
     "role": {
       "fr": "Développeur Full Stack",
       "en": "Full Stack Developer"
     },
     "mission": {
       "fr": "Mission du projet...",
       "en": "Project mission..."
     },
     "url": "https://example.com",
     "mashup": "./assets/newProject/mashup.png",
     "features": [
       {
         "title": {"fr": "Fonctionnalité 1", "en": "Feature 1"},
         "details": {"fr": "Détails...", "en": "Details..."},
         "img": "./assets/newProject/features/feature1.png"
       }
     ]
   }
   ```

2. Add images in `assets/newProject/`

### 🎨 Customization

#### Colors
Modify variables in `style/config.css`:
```css
:root {
    --main-color: #your-color;
    --second-color: #your-color;
    --first-light-color: #your-color;
    /* etc. */
}
```

#### Fonts
Modify imports in `style/config.css` and variables:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');
--main-font: 'YourFont', sans-serif;
```

### 📄 License

This project is free to use for personal purposes. For commercial use, please contact me.

### 📧 Contact

- **Email**: quentin.beaudiquez@gmail.com
- **LinkedIn**: [Quentin Beaudiquez](https://linkedin.com/in/quentin-beaudiquez)
- **GitHub**: [Qbeaudiquez](https://github.com/Qbeaudiquez)

---

**Made with ❤️ by Quentin Beaudiquez**
