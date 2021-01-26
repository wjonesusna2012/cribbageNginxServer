import express from 'express';
import HelperFunctions, { deck } from './helperFunctions';
const bodyParser = require('body-parser');
const env = require('dotenv').config(); 
const app = express();

const jsonParser = bodyParser.json();

app.post('/', jsonParser, (req, res) => {
  const { body } = req;
  const data = HelperFunctions.createPointTree(body.dealtHand, deck);
  res.send(200).json({ data });
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});