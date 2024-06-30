const express = require('express');
const app = express();
const blagueRoute = require('./routes/blagueRoute');
const db = require('./models');

app.use(express.json());
app.use('/api/v1', blagueRoute);

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false }).then(() => {
 
  app.listen(PORT, () => {
    console.log(`SERVER ON, URL : http://localhost:${PORT}`);
    console.log('BDD SYNC');
  });
}
).catch(error => {
  console.error('BDD NOT SYNC', error);
});