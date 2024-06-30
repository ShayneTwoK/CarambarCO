const { Blague } = require("../models");
const { sequelize } = require("../models");

// Ajouter une blague en BDD via Postman
exports.ajouterBlague = async (req, res) => {
  try {
    const blague = await Blague.create(req.body);
    res.status(201).json(blague);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consulter toutes les blagues
exports.getAllBlagues = async (req, res) => {
  try {
    const allBlagues = await Blague.findAll();
    res.json(allBlagues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Consulter une blague avec son Id
exports.getOneBlague = async (req, res) => {
  try {
    const blague = await Blague.findByPk(req.params.id);
    res.json(blague);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consulter une blague aléatoire
exports.getOneRandomBlague = async (req, res) => {
  try {
    const randomBlague = await Blague.findOne({  order: [[ sequelize.literal('RANDOM()') ]] });
    res.json(randomBlague);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};