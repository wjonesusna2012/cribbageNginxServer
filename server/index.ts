import express from 'express';
import HelperFunctions, { deck } from './helperFunctions';
import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
// const env = require('dotenv').config(); 
import env from 'dotenv';

const envParsed = env.config();
const app = express();

const jsonParser = bodyParser.json();

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type' // Doesn't seem necessary but is for some reason. Should be allowed https://developer.mozilla.org/en-US/docs/Glossary/CORS-safelisted_request_header
  });
  next();
});

app.post('/', jsonParser, (req, res) => {
  const { body } = req;
  const data = HelperFunctions.createPointTree(body.dealtHand, deck);
  res.json({ data });
});

app.get('/health', (req,res) => {
  res.json({status: 'Healthy and running!'});
});

app.listen(envParsed.parsed?.PORT ?? 12345, () => {
  console.log(`Server running on port ${envParsed.parsed?.PORT ?? '12345'}`);
});