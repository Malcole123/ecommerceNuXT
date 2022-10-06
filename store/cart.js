const state = ()=>({
  cartItems:[],
  delivery:{
    address:{
      name:"",
      street:"",
      city:"",
      state:"",
      country:"",
      default:false
    },
    cost:0,
  }
})

const getters = {
  getCart(state){
    return state.cartItems
  },

  getCartTotal(state){
    return state.cartTotal
  },

  getItemTotal(state){
    let c_ = state.cartItems;
    return c_.length;

  }
}

const mutations = {
  add(state, prodObj){
    const {name , prodID, price, img } = prodObj;
    //Find Item In Cart
    let ind_ = state.cartItems.findIndex((item, index)=>{
      return item.uid === prodID
    })
    let inArr = ind_ === -1 ? false : true;
    if(inArr){
      let focus = state.cartItems[ind_]
      focus.quantity += 1;
      state.cartItems[ind_] = focus
    }else{
      let n_Cart = {
          quantity:1,
          name:name,
          uid:prodID,
          price:price,
          image:img
      }
      state.cartItems.push(n_Cart);
    }
    localStorage.setItem('ANCA02I8MX', JSON.stringify(state.cartItems));

  },

  remove(state, { prodID }){
    state.cartItems = [...state.cartItems].filter((item,index)=>{
      if(item.uid !== prodID){
        return item
      }
    })
    localStorage.setItem('ANCA02I8MX', JSON.stringify(state.cartItems));
  },
  increaseQuantity(state, {prodID, index}){
      [...state.cartItems].map((item,i)=>{
        if(item.uid === prodID && index === i){
            item.quantity += 1;
        }
      })
      localStorage.setItem('ANCA02I8MX', JSON.stringify(state.cartItems));

  },
  decreaseQuantity(state, {prodID, index}){
    [...state.cartItems].map((item,i)=>{
      if(item.uid === prodID && index === i){
          item.quantity -= 1;
      }
    })
    localStorage.setItem('ANCA02I8MX', JSON.stringify(state.cartItems));
},
  clear(state){
    state.cartItems = [];
    localStorage.setItem('ANCA02I8MX', JSON.stringify([]));
    console.log(state.cartItems)
  },

  setfromStorage(state, {cartItems}){
    state.cartItems = [...cartItems]
  }
}

const actions = {
  loadFromLocal(state){
    let saved_ = localStorage.getItem('ANCA02I8MX');
    if(saved_ === null || saved_ === undefined){
      return false
    }else{
      let json = JSON.parse(saved_)
      state.commit('setfromStorage', {cartItems:json})
      return json
    }
  },
}




export {state, mutations, getters, actions}
