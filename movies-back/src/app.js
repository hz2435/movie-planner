import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // Import the cors middleware
import axios from 'axios';
import { MongoClient } from 'mongodb';

const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const API_KEY=process.env.API_KEY;
const MONGO_URI = process.env.MONGO_URI;

const OMDB_HOST = "http://www.omdbapi.com"

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async () => {
    await client.connect();
    db = client.db('my_db');
};

connectDB().catch(console.error)

app.get('/watchlist', async (req, res) => {
  try {
      const movies = await db.collection('movies').find().toArray();
      res.json({ movies: movies });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/search', async (req, res) => {
  const title = req.query.title;

  if (!title) {
    return res.status(400).json({ message: 'Title query parameter is required.' });
  }

  try {
    const response = await axios.get(OMDB_HOST, {
      params: {
        apikey: API_KEY,
        t: title,
      }
    });

    if (response.data.Response === "True") {
      return res.json({title: response.data.Title, image_url: response.data.Poster});
    } else {
      return res.status(404).json({ message: response.data.Error });
    }

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.post('/watchlist/add', async (req, res) => {
  const newItem = {title: req.body.title, image_url: req.body.image_url}; 
  try {
      await db.collection('movies').insertOne(newItem);
      res.json({ message: 'Movie added successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
