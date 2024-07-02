const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const blagueRoute = require('./routes/blagueRoute');
const db = require('./models');
const { swaggerUi, specs } = require('./config/swagger');

// const corsOptions = {
//   origin: "https://shaynetwok.github.io/carambar-co-githubpages/",
//   methods: "*", // Autoriser toutes les méthodes (GET, POST, PUT, PATCH, DELETE, OPTIONS)
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "X-Requested-With",
//     "Accept",
//     "Origin",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Methods",
//     "Access-Control-Allow-Credentials",
//     "X-Custom-Header",
//     "User-Agent",
//   ],
// };

// Use Helmet to secure your app by setting various HTTP headers
app.use(helmet());

// List of allowed origins
const allowedOrigins = ['https://shaynetwok.github.io/carambar-co-githubpages', 'http://localhost:4200', 'https://shaynetwok.github.io/']; // Add other allowed origins as needed

// Configure CORS options dynamically based on the origin of the request
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { 
      origin: true, // Reflect the request origin in the CORS response
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Access-Control-Allow-Origin",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Credentials",
        "X-Custom-Header",
        "User-Agent",
      ],
      credentials: true // Enable if you need to send cookies or authentication headers
    };
  } else {
    corsOptions = { origin: false }; // Disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

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