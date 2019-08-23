var express = require('express');
var app = express();

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
