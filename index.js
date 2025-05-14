import 'dotenv/config';
import axios from "axios";
import express from "express";


import warRoutes from './routes/war.js';
import pingRouter from './routes/ping.js';

const app = express();
app.use(express.json());

app.use('/war', warRoutes);
app.use('/ping', pingRouter);

const clanTag = process.env.CLAN_TAG;

app.get('/', async (req, res) => {
  const encodedTag = clanTag.replace('#', '%23');
  
  const headers = {
  Authorization: `Bearer ${process.env.APIKEY}`
  };
  let {data} = await axios.get(`https://api.clashofclans.com/v1/clans/${encodedTag}`, {headers});
  res.send(data);
})

app.get('/:tag', async (req, res) => {
    let tag = req.params.tag;
  const encodedTag = tag.replace('#', '%23');
  
  const headers = {
  Authorization: `Bearer ${process.env.APIKEY}`
  };
  let {data} = await axios.get(`https://api.clashofclans.com/v1/clans/${encodedTag}`, {headers});
  res.send(data);
})


/*
app.use((req, res) => {
  res.redirect("/");
});
*/

app.listen(3000, () => {
  console.log(`localhost:3000`);
});