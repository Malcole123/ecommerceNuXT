const express = require('express');
const app = express();


const products =require('./routes/products');
app.use(products);


module.exports = app

if(require.main === module){
  const port = process.env.PORT
  app.listen(port)
}
