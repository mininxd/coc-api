import { Router } from 'express';
import 'dotenv/config';
import axios from "axios";
const router = Router();


const headers = {
  Authorization: `Bearer ${process.env.APIKEY}`
  };
  
const endpoint = `https://api.clashofclans.com/v1/`

router.get('/', async (req, res) => {
try {
  let {data} = await axios.get(`${endpoint}/warlog`,{headers});
  console.log(data);
  res.send("200");
  } catch(e) {
  console.log(e);
  res.send("500");
  }
});



export default router;