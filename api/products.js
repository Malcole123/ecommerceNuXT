const express = require('express');
const app = express();
const products = require("../products.json")
app.use(express.json());



app.get('/products', async (req,res, next)=>{
  res.send(products)
})

module.exports = app
