import express from 'express';
import products from "../products.json"
const app = express();
app.use(express.json());



app.post('/confirm', async (req,res, next)=>{
  let res_ =  {
    success:true,
    data:{}
  };
  res.send(res_);
})

app.get('/get_details/:id', async (req,res, next)=>{
  let cid = new URLSearchParams(req.params).get('id');
  let res_ =  {
    ok:true,
    data:{}
  }
  res.send(res_)
})




export default app


