import express from 'express';

const app = express();
const products = require("../../products.json");
app.use(express.json());

const errorHandle = async (req, res , next)=>{
  res.send({msg:"No Product Found", status:400})
}

app.get('/products', async (req,res, next)=>{
  res.status(200).send({products})
})

app.get('/product_one/*', async (req,res, next)=>{
  let p_arr = req.path.split('/');
  let t_uid = [...p_arr][p_arr.length-1];
  let return_var = [...products].find((item,index)=>{
    if(item.id === t_uid){
      return item
    }
  })
  if(return_var === undefined){
    res.json({msg:"No Product Found", status:400})
  }else{
    res.json({status:200, data:return_var})
  }
})

module.exports = app
