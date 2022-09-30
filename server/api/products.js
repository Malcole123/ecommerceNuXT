import express from 'express';

const app = express();
const products = require("../../products.json");
app.use(express.json());

const getOne = (t_uid)=>{
  let return_var = [...products].find((item,index)=>{
    if(item.id === t_uid){
      return item
    }
  })
  if(return_var === undefined){
    return {ok:false,data:null}
  }else{
      return {ok:true, data:return_var}
  }
}

const getAll = ()=>{
  return {
    ok:true,
    data:products,
  }
}
export default app.all('/products/:get_action/:product_id', async (req,res, next)=>{
  let action = req.params['get_action'];
  let prodID = req.params['product_id']
  let response = {
    ok:false,
    data:null
  }
  switch(action){
    case "get_all":
      response = getAll();
      break
    case "get_one":
      if(prodID === undefined){break}
      response = getOne(prodID)
      break
  }
  res.send(response)
})





