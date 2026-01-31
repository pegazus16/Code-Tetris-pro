# Architecture du Code Tetris Pro

## Structure Modulaire

Le projet a ete refactorise pour une meilleure maintenabilite et evolutivite.

### Organisation des Fichiers

```
src/
├── index.html              # Point d'entree HTML simplifie
├── css/                    # Styles separes par responsabilite
│   ├── base.css           # Styles de base et reset
│   ├── menu.css           # Styles du menu principal
│   ├── game.css           # Styles de la zone de jeu
│   ├── particles.css      # Styles des particules
│   └── overlays.css       # Styles des overlays (victory, game over)
└── js/
    ├── main.js            # Point d'entree de l'application
    ├── audio/
    │   └── AudioManager.js     # Gestion audio centralisee
    ├── game/
    │   ├── Game.js             # Logique principale du jeu
    │   ├── GameState.js        # Gestion de l'etat du jeu
    │   └── Word.js             # Classe Word pour les mots
    ├── effects/
    │   └── ParticleSystem.js   # Systeme de particules
    ├── data/
    │   └── projects.js         # Donnees des projets (C++, Python, JS)
    ├── utils/
    │   └── constants.js        # Configuration et constantes
    └── ui/
        └── UIManager.js        # Gestion de l'interface utilisateur
```

## Modules JavaScript (ES6)

### 1. AudioManager (Singleton)
- Gestion centralisee de tous les sons
- Throttling pour eviter la surcharge audio
- Sauvegarde des preferences dans localStorage
- Gestion d'erreurs robuste

### 2. GameState
- Gestion de l'etat du jeu (score, lives, level, combo)
- Calculs d'accuracy et statistiques
- Logique de progression (level up, game over)
- Separation claire entre donnees et logique

### 3. Word
- Representation d'un mot dans le jeu
- Gestion de la position et du mouvement
- Logique de frappe de lettres
- Coloration syntaxique automatique

### 4. ParticleSystem
- Systeme de particules modulaire
- Adaptation automatique aux couleurs du langage
- Configuration centralisee
- Performance optimisee

### 5. UIManager
- Abstraction de tous les elements DOM
- Gestion des transitions entre ecrans
- Mise a jour centralisee de l'interface
- Separation entre logique et presentation

### 6. Game (Orchestrateur)
- Coordonne tous les modules
- Game loop principal
- Gestion des evenements
- Controle du flux de jeu

## Avantages de la Nouvelle Architecture

### Maintenabilite
- Chaque module a une responsabilite unique
- Code facile a comprendre et modifier
- Separation claire des preoccupations

### Testabilite
- Modules independants testables unitairement
- Pas de variables globales
- Injection de dependances possible

### Evolutivite
- Facile d'ajouter de nouvelles fonctionnalites
- Modules interchangeables
- Configuration centralisee

### Performance
- Chargement modulaire
- Code optimise et minifiable
- Meilleure gestion de la memoire

### Debugging
- Erreurs localisees facilement
- Stack traces plus claires
- Console.log strategiques possibles

## Principes Appliques

1. **Single Responsibility Principle** : Chaque classe a une seule raison de changer
2. **Separation of Concerns** : HTML/CSS/JS separes, logique/UI separees
3. **DRY (Don't Repeat Yourself)** : Configuration centralisee, pas de duplication
4. **KISS (Keep It Simple, Stupid)** : Architecture simple et comprehensible
5. **Encapsulation** : Donnees et methodes privees quand necessaire

## Scripts NPM

- `npm run build` : Compile le projet dans le dossier www/
- `npm run dev` : Lance un serveur de dev sur http://localhost:8080
- `npm run cap:sync` : Synchronise avec Capacitor
- `npm run build:apk` : Genere l'APK Android

## Prochaines Ameliorations Possibles

Voir le fichier ROADMAP.md pour les fonctionnalites futures.
