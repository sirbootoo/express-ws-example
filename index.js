const express = require('express');
require('dotenv').config();
const path = require('path');
const axios = require('axios');

const port = process.env.PORT || 3010;

const expressWs = require('express-ws')(express());
const app = expressWs.app;


app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
});

app.post('/uniqueElements', (req, res) => {
  const arr = req.body.arr;
  const uniqueElements = uniqueValues(arr);
  res.json({ status: 1, uniqueElements });
});

const uniqueValues = (arr) => {
  let count = arr.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});
  return Object.keys(count).filter((a) => count[a] === 1);
};

app.ws('/coins', function (ws, req) {
  setInterval(async () => {
    const payload = await getCoinMarketInfo();
    ws.send(JSON.stringify(payload));
  }, (3 * 60 * 1000));
});

app.ws('/', function (ws, req) {
  console.log('inside');
  ws.on('message', function (msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
  ws.send('Hello Express');
});

const getCoinMarketInfo = async () => {
  try {
    const payload = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    return payload.data;
  } catch (err) {
    throw err;
  }
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
