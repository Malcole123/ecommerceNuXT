const state = ()=>({
  allProducts:[],
  mainSorted:[],
})

const getters = {
  getAllProducts(state){
    return {
      all:state.allProducts,
      mSort:state.mainSorted
    }
  },

  getOneProduct:async (state)=>{
    return async ({uid, price})=>{
      let prod_ = state.allProducts.find((item,index)=>{
        if(item.uid === uid){
          return item
        }
      })
      let return_dt = {
        ok:prod_ === undefined ? false : true,
        data:prod_
      }
      //Pull from database -> useful
      if(return_dt.ok){
        return return_dt
      }else{
        const {data, ok } = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:3ky6p00f/products/1?uid="+uid).then(res=>res.json()).then(data=>{return data}).catch(error=>{return error})
        if(ok){
          return_dt = data;
        }
        return return_dt
      }
    }
  }


}

const mutations = {
  async setProducts(state, {dt_, override, sort}){
    const productSort = (arr)=>{
      let sort_arr = [4, 3, 4, 3, 4, 3];
      let return_arr = [];
      let checked = 0;
      sort_arr.forEach((num, index)=>{
          let created_obj = {
            type:num === 4 ? 'quad' :'trio',
            products:[],
          }
          created_obj.products = arr.splice(checked, num);
          return_arr.push(created_obj)
      })
      return return_arr
    }

    state.allProducts = [...dt_];
    state.mainSorted = [...productSort(dt_)];
    console.log(state.allProducts,state.mainSorted)
  },
}

const actions = {
  async getProductData(state){

    const {ok , data, error} = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:3ky6p00f/products").then(res=>res.json()).then(data=>{return data}).catch(error=>{ return {error}});
    console.log(ok,data,error)
    if(ok){
        state.commit('setProducts', {dt_:data, override:true});
      }else{
        //
      }
  },
  async clearProducts(state){
    state.allProducts.splice(0, state.allProducts.length)
  }

}





export {state, mutations, getters, actions}
