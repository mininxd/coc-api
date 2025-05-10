import 'dotenv/config';
import axios from "axios";
import express from "express";


import warRoutes from './routes/war.js';

const app = express();
app.use(express.json());

app.use('/war', warRoutes);


app.get('/', async (req, res) => {
  const clanTag = process.env.CLAN_TAG;
  const headers = {
  Authorization: `Bearer ${process.env.APIKEY}`
  };
  let {data} = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag.replace("#","%23")}`, {headers});
  res.send(data)
})


app.listen(3000, () => {
  console.log(`localhost:3000`);
});