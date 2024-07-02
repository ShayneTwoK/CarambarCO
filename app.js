const express = require('express');
const cors = require('cors');
const app = express();
const blagueRoute = require('./routes/blagueRoute');
const db = require('./models');
const { swaggerUi, specs } = require('./config/swagger');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    console.log(`SERVER ON, URL : http://localhost:${PORT}`);
    console.log(`SWAGGER URL : http://localhost:${PORT}/api-docs/v1`);
    console.log('BDD SYNC');
  });
}
).catch(error => {
  console.error('BDD NOT SYNC', error);
});