import express from 'express';
import products from "../products.json"
const app = express();
app.use(express.json());

const getOne = (t_uid)=>{
  let return_var = products.find((item,index)=>{
    if(item.uid === t_uid){
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



app.get('/products', async (req,res, next)=>{
  let res_ =  getAll();
  res.send(res_);
})

app.get('/products/:id', async (req,res, next)=>{
  let uid = new URLSearchParams(req.params).get('id');
  let res_ =  getOne(uid);
  res.send(res_)
})




export default app


