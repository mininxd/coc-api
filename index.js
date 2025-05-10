import 'dotenv/config';
import axios from "axios";
import express from "express";

const app = express()


app.get('/', async (req, res) => {
  let {data} = await axios.get(`${process.env.ORIGIN_URL}`)
  res.send(data)
})

app.get('/war', async (req, res) => {
  try {
  let {data} = await axios.get(`${process.env.ORIGIN_URL}/war`)
  res.send(data)
  } catch(e) {res.send(e.message)}
})
app.get('/war/log', async (req, res) => {
  try {
  let {data} = await axios.get(`${process.env.ORIGIN_URL}/war/log`)
  res.send(data)
  } catch(e) {res.send(e.message)}
})
app.get('/war/liga', async (req, res) => {
  try {
  let {data} = await axios.get(`${process.env.ORIGIN_URL}/war/league`)
  res.send(data)
  } catch(e) {res.send(e)}
})


app.listen(3000, () => {
  console.log(`localhost:3000`);
});