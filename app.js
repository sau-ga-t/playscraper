const express = require('express')
const [getHomeScreen] = require('./scraper/scraper')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const response = await getHomeScreen();
  res.json(response);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})