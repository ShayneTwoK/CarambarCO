# CarambarCO
Projet de sélection CDA pour Simplon

Demande cliente :

"Nous souhaitons une landing page qui reflète fidèlement notre marque. Cette page comportera un bouton qui, à chaque clic, affichera une blague aléatoire."

Environnement Technique :
- Node.js
- Express
- Sequelize
- BDD : SQLite
- Architecture MVC et API  versionné
- Swagger pour documenter et tester son API

Outils utilisés :
- VSCode
- Postman
- Github
- Hébergement du Back : Render
- Hébergement du Front : Github Pages

Spécifications Techniques :
- 4 endpoint pour l'API :
 1. Ajouter une blague via Postman
 2. Consulter toutes les blagues (ex : xxx/blagues)
 3. Consulter une blague (ex : xxx/blagues/:id)
 4. Consulter une blague aléatoire (ex : xxx/blagues/random)

LIENS pour l'évaluation :
API : http://localhost:3000/api/v1
Swagger : http://localhost:3000/api-docs/v1

Procédure de Développement du projet :

    1. Initialisation du projet

    - Projet crée vide sur Github nommé CarambarCo :
    
        git clone de mon projet

    - Initialiser le projet avec Node.js (node_modules, packages) :
    
        npm init -y

    - Installer les dépendances Express, Sequelize et SQLite :
    
        npm install express sequelize sqlite3

    - Initialiser le projet avec Sequelize (dossiers config, models, migrations et seeders) :
    
        npx sequelize-cli init

    - Installer un mode "dev" pour faciliter le lancement de son serveur et le debug :
    
        npm install --save-dev nodemon

    - Finaliser l'architecture MVC avec l'ajout du dossier "controllers" et renseigner nos endpoint API plus tard avec l'ajout du dossier "routes"

    - Configurer notre projet config/config.json pour stipuler l'utilisation de SQLite et la génération de notre bdd via un fichier :

        "dialect": "sqlite",
        "storage": "./database.sqlite"

    - Renseigner les commandes pour démarrer l'application en mode "dev" et "prod" via le fichier "package.json"
    
    "scripts": {
        "start": "node app.js", // npm start
        "dev": "nodemon app.js" // npm run dev
    }

    - Créer le fichier "app.js" à la racine du projet qui permettra de lancer plus tard l'application

    2. Architecture MVC

    Modèle :

        - Sequelize propose une commande pour générer un "modèle" de données dans notre dossier "models".
        Il générera également un fichier "create-{nomDuModele}" dans le dossier "migrations" pour creer la table en bdd, ici ce sera pour notre model "Blague"
        npx sequelize-cli model:generate --name Blague --attributes question:string, answer:string

        - Valider la migration du model
        npx sequelize-cli db:migrate 
        
    Controller :

        - Créer son controller "blagueController" pour le modele "Blague" qui définera nos 4 Endpoint API :

        1. Ajouter une blague en BDD via Postman : ajouterBlague
        2. Consulter toutes les blagues : getAllBlagues
        3. Consulter une blague avec son Id : getOneBlague
        4. Consulter une blague aléatoire : getOneRandomBlague

    Route :

        - Créer les routes "blagueRoute" qui renseigneront les endpoints du Controller pour appeler l'API
        1. Ajouter une blague en BDD via Postman
        router.post('/addBlague', blagueController.ajouterBlague);

        2. Consulter toutes les blagues
        router.get('/blagues', blagueController.getAllBlagues);

        3. Consulter une blague avec son Id
        router.get('/blagues/:id', blagueController.getOneBlague);

        4. Consulter une blague aléatoire
        router.get('/random', blagueController.getOneRandomBlague);

    3. Démarrer son application

    - Configurer son fichier "app.js" en renseignant Express, "blagueRoute" pour tester notre API et le Port de notre application

    // URL de base vers notre API Blague
    app.use('/api/v1', blagueRoute);
    
    - Lancer notre application :
    
    npm run dev

    4. Données de notre base de données

        /!\ Le fichier database.sqlite doit déjà avoir été générer en amont /!\
        - Sequelize nous permet de générer via une commande, des données factices pour la table "Blagues" dans notre bdd pour tester son fonctionnement.
        Le fichier sera générer dans le dossier "seeders" et devra être compléter directement avec nos données manuellement.
        
        npx sequelize-cli seed:generate --name blague-data-sample

        - Pour confirmer l'ajout des données, il faut la commande Sequelize suivante :

        npx sequelize-cli db:seed:all

    5. Swagger

        - Installer les dépendances swagger :
        
        npm install swagger-jsdoc swagger-ui-express

        - Configurer Swagger pour son application avec la création et la complétion du fichier "swagger.js".
        Pour ma part il sera dans le dossier "config"

        - Mettre à jour le fichier "app.js" pour renseigner Swagger et sa route

        app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(specs));

        - Mettre à jour nos routes, ici le fichier "blagueRoute" comprenant les 4 endpoints.
         Utiliser les annotations Swagger JSDoc pour que l'API soit documentés et testable directement depuis le lien Swagger

        - Enfin, lancer le serveur et rendez-vous sur le lien http://localhost:3000/api-docs/v1 spécifié précédemment

        npm start

