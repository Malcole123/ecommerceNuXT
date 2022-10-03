import express, { response } from 'express';

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



export default app.get('/products', async (req,res, next)=>{
  const response = {
    ok:false,
    data:null
  }
  let res_ = Object.create(response)
  res_ = getAll();
  res.send(res_)
})




