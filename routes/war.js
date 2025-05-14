import { Router } from 'express';
import 'dotenv/config';
import axios from "axios";
const router = Router();


const clanTag = process.env.CLAN_TAG;
const headers = {
  Authorization: `Bearer ${process.env.APIKEY}`
  };
  
const clansEndpoint = `https://api.clashofclans.com/v1/clans`;

// currentwar
router.get('/:tag', async (req, res) => {
  let tag = req.params.tag;
  if (!tag) {
    tag = clanTag;
  }
  const encodedTag = tag.replace('#', '%23');

  try {
    const { data } = await axios.get(`${clansEndpoint}/${encodedTag}/currentwar`, { headers });
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(503).send("Service Unavailable\n");
  }
});


// league
router.get('/league/:tag', async (req, res) => {
  let tag = req.params.tag;  
  if (!tag) {   
    tag = clanTag;  
  }
  const encodedTag = tag.replace('#', '%23');

  try {
    const { data } = await axios.get(`${clansEndpoint}/${encodedTag}/currentwar/leaguegroup`, { headers });
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(503).send("Service Unavailable\n");
  }
});

// warlog
router.get('/log/:tag', async (req, res) => {
  let tag = req.params.tag;   
  if (!tag) {
    tag = clanTag;   
  }
  const encodedTag = tag.replace('#', '%23');

  try {
    const { data } = await axios.get(`${clansEndpoint}/${encodedTag}/warlog`, { headers });
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(503).send("Service Unavailable\n");
  }
});


export default router;