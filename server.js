import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/Index';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(MONGO_URL, err => {
  return err ? 
    console.log('Unable to Establish Connection to DB') :
      console.log('Connection to DB established');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', router);

app.listen(PORT, () => {
  console.log('Server is running on: ', PORT);
});