import 'dotenv/config';
import axios from "axios";
import express from "express";

const app = express()

app.get('/', async (req, res) => {
  const tag = req.query.tag;
  const clanTag = encodeURIComponent(tag || process.env.CLAN_TAG);

 try {
   let {data} = await axios.get(`${process.env.ORIGIN_URL}/${clanTag}`)
  res.send(data)
  } catch(e) {
    console.log(e)
    res.send(e.message)
  }
  })

app.get('/war', async (req, res) => {
  const tag = req.query.tag;
  const clanTag = encodeURIComponent(tag || process.env.CLAN_TAG);
  try {
  let {data} = await axios.get(`${process.env.ORIGIN_URL}/war/${clanTag}`)
  res.send(data)
  } catch(e) {
    console.log(e)
    res.send(e.message)}
})

app.get('/war/log', async (req, res) => {
  const tag = req.query.tag;
  const clanTag = encodeURIComponent(tag || process.env.CLAN_TAG);
  
  try {
  let {data} = await axios.get(`${process.env.ORIGIN_URL}/war/log/${clanTag}`)
  res.send(data)
  } catch(e) {
    console.log(e)
    res.send(e.message)}
})

/*
app.get('/war/liga', async (req, res) => {
  try {
  let {data} = await axios.get(`${process.env.ORIGIN_URL}/war/league`)
  res.send(data)
  } catch(e) {res.send(e)}
})
*/

app.listen(3000, () => {
  console.log(`localhost:3000`);
});