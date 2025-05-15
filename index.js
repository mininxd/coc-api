import 'dotenv/config';
import axios from "axios";
import express from "express";

import { initArcjet } from './lib/arcjet.js';
async function runArcjet(req, res) {
  return !process.env.ARCJET_KEY || await initArcjet(req, res);
}

import warRoutes from './routes/war.js';



const app = express();
app.use(express.json());

app.use('/war', warRoutes);

const clanTag = process.env.CLAN_TAG;

app.get('/:tag', async (req, res) => {
  const tag = req.params.tag;
  const encodedTag = tag.replace('#', '%23');

  const allowed = await runArcjet(req, res);
  if (!allowed) return;

  try {
    const headers = {
      Authorization: `Bearer ${process.env.APIKEY}`,
    };

    const { data } = await axios.get(`https://api.clashofclans.com/v1/clans/${encodedTag}`, { headers });
    res.send(data);
  } catch (e) {
    res.status(403).json({ message: 'Forbidden' });
  }
});



app.use((req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`localhost:3000`);
});