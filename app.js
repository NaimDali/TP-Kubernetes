// app.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from my computer!!!');
});

app.get('/new', (req, res) => {
    res.send('This is a new page');
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});