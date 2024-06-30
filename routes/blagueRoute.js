// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const blagueController = require('../controllers/blagueController');

// Ajouter une blague en BDD via Postman
router.post('/addBlague', blagueController.ajouterBlague);

// Consulter toutes les blagues
router.get('/blagues', blagueController.getAllBlagues);

// Consulter une blague avec son Id
router.get('/blagues/:id', blagueController.getOneBlague);

// Consulter une blague aléatoire
// Ne marche avec l'url "blagues" voila pourquoi "/blagues/random" à été raccourci à "/random"
router.get('/random', blagueController.getOneRandomBlague);

module.exports = router;