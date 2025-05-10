import { Router } from 'express';
import 'dotenv/config';
import axios from "axios";
const router = Router();


const clanTag = process.env.CLAN_TAG;
const headers = {
  Authorization: `Bearer ${process.env.APIKEY}`
  };
  
const clansEndpoint = `https://api.clashofclans.com/v1/clans/${clanTag.replace("#","%23")}`;

// currentwar
router.get('/', async (req, res) => {
  let {data} = await axios.get(`${clansEndpoint}/currentwar`,{headers});
  res.send(data);
});

// league
router.get('/league', async (req, res) => {
  let {data} = await axios.get(`${clansEndpoint}/currentwar/leaguegroup`,{headers});
  res.send(data);
});

// warlog
router.get('/log', async (req, res) => {
  let {data} = await axios.get(`${clansEndpoint}/warlog`,{headers});
  res.send(data);
});

export default router;