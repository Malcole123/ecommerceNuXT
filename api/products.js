/*import { Router } from "express";
const router = Router();
import * as products from "../products.json";


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

router.get('/products', async (req,res, next)=>{
  let res_ =  getAll();
  res.send(res_);
})

router.get('/products/:id', async (req,res, next)=>{
  let uid = new URLSearchParams(req.params).get('id');
  let res_ =  getOne(uid);
  res.send(res_)
})

export default router
*/
