const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all("/graphql/:id", function(req, res) {
  const URL = `https://dropmail.me/api/graphql/${req.params.id}`;

  axios
    .post(URL, req.body)
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(error => {
      console.log(error);
      res.status(error.response.status).send(error.response.data);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});