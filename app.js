const express = require('express');
const cors = require('cors');
const app = express();
const blagueRoute = require('./routes/blagueRoute');
const db = require('./models');
const { swaggerUi, specs } = require('./config/swagger');

app.use(cors({
  origin: 'https://shaynetwok.github.io'
}));

app.use(express.json());

// URL de base vers notre API Blague
app.use('/api/v1', blagueRoute);

// URL de base vers notre documentation Swagger
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;

// "force: false" Assure que les models soit synchro avec la bdd chaque demarrage d'application en gardant les données existantes
// alors que "force: true" supprimera et recréera toutes les tables à chaque demarrage sans données
db.sequelize.sync({ force: false }).then(() => {
 
  // Ecoute le port 3000 et renvoie un message en console en fonction de la connection
  app.listen(PORT, () => {
    console.log(`SERVER LOCAL ON, URL : http://localhost:${PORT}`);
    console.log(`SWAGGER URL LOCAL : http://localhost:${PORT}/api-docs/v1`);
    console.log(`SERVER ONLINE ON, URL : https://carambarco.onrender.com`);
    console.log(`SWAGGER URL ONLINE : https://carambarco.onrender.com/api-docs/v1`);
    console.log('BDD SYNC');
  });
}
).catch(error => {
  console.error('BDD NOT SYNC', error);
});