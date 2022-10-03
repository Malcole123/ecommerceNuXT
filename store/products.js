const state = ()=>({
  allProducts:[],
  mainSorted:[],
})

const getters = {
  async getAllProducts(state){
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
  async setProducts(state, {dt_, sortDt_, override, sort}){
    state.allProducts = dt_;
    state.mainSorted = sortDt_;
    //console.log(state.allProducts,state.mainSorted)
  },
}

const actions = {
  async getProductData(state){
    if(ok){
        state.commit('setProducts', {dt_:data,sortDt_:productSort(data),override:true});

      }else{
        //
        console.log(error)
      }
  },
  async clearProducts(state){
    state.allProducts.splice(0, state.allProducts.length)
  }

}





export {state, mutations, getters, actions}
