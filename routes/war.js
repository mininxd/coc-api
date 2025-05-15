import { Router } from 'express';
import 'dotenv/config';
import axios from "axios";
import { initArcjet } from '../lib/arcjet.js';
const router = Router();

async function runArcjet(req, res) {
  return !process.env.ARCJET_KEY || await initArcjet(req, res);
}



const headers = {
  Authorization: `Bearer ${process.env.APIKEY}`
  };
  
const clansEndpoint = `https://api.clashofclans.com/v1/clans`;

// currentwar
router.get('/:tag', async (req, res) => {
  const tag = req.params.tag;
  const encodedTag = tag.replace('#', '%23');

  const allowed = await runArcjet(req, res);
  if (!allowed) return;

  try {
    const { data } = await axios.get(`${clansEndpoint}/${encodedTag}/currentwar`, { headers });
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(403).json({ message: 'Forbidden' });
  }
});

// warlog
router.get('/log/:tag', async (req, res) => {
  const tag = req.params.tag;
  const encodedTag = tag.replace('#', '%23');

  const allowed = await runArcjet(req, res);
  if (!allowed) return;

  
  try {
    const { data } = await axios.get(`${clansEndpoint}/${encodedTag}/warlog`, { headers });
    res.send(data);
  } catch (e) {
    res.status(403).json({ message: 'Forbidden'});
  }
});


export default router;