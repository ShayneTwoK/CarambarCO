// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const blagueController = require('../controllers/blagueController');

// Swagger pour une description globale de l'API Blague
/**
 * @swagger
 * components:
 *   schemas:
 *     Blague:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: integer
 *           description: identificateur de la blague auto-incrementé
 *         question:
 *           type: string
 *           description: Le nom de la blague
 *         answer:
 *           type: string
 *           description: La chute de la blague
 *       example:
 *         id: 1
 *         question: "Quelle est la femelle du hamster ?"
 *         answer: "L’Amsterdam"
 */

// Swagger pour "addBlague"
/**
 * @swagger
 * /api/v1/addblague:
 *   post:
 *     summary: Ajoute une blague
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *              $ref: '#/components/schemas/Blague'
 *             example:
 *              question: Quelle est la femelle du hamster ?
 *              answer: L’Amsterdam
 *     responses:
 *       201:
 *         description: Succès ! La blague à été ajouté !
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Blague'
 */


// Ajouter une blague en BDD via Postman
router.post('/addBlague', blagueController.ajouterBlague);

// Swagger pour "blagues"
/**
 * @swagger
 * /api/v1/blagues:
 *   get:
 *     summary: Consulte toutes les blagues
 *     responses:
 *       200:
 *         description: Succès ! La liste de blagues à été retourné !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

// Consulter toutes les blagues
router.get('/blagues', blagueController.getAllBlagues);

// Swagger pour "/blagues/:id"
/**
 * @swagger
 * /api/v1/blagues/:id:
 *   get:
 *     summary: Consulte une blague
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: identificateur de la blague auto-incrementé
 *     responses:
 *       200:
 *         description: Succès ! La blague à été retourné !
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

// Consulter une blague avec son Id
router.get('/blagues/:id', blagueController.getOneBlague);

// Swagger pour "/random"
/**
 * @swagger
 * /api/v1/random:
 *   get:
 *     summary: Consulte une blague aléatoire
 *     responses:
 *       200:
 *         description: Succès ! La blague aléatoire à été retourné !
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  question:
 *                    type: string
 *                  answer:
 *                    type: string
 */

// Consulter une blague aléatoire
// Ne marche pas avec l'url "blagues" voila pourquoi "/blagues/random" à été raccourci à "/random"
router.get('/random', blagueController.getOneRandomBlague);

module.exports = router;