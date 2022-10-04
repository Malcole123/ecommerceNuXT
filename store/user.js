const state = ()=>({
    filled:false,
    authToken:"",
    user:{
      id:"",
      name:"",
      email:"",
      phone_number:"",
      address:[],
      payment:[{ /*NOT SUGGESTED FOR PRODUCTION --ONLY FOR TEST PURPOSES--*/
        ccNumber:"378282246310005",
        ccCvv:"776",
        ccExp:"02/36",
        ccName:"",
        ccType:"Visa",
        default:true,
      }]
    }
})

const getters = {
    getFilled(state){
        return state.filled
    },
    async myCheckoutDetails(state){
      const { name, address, email, phone_number, id, payment} = state.user;
      //const  cartItems = this.getters['cart/getCartItems']
        return {
          name,
          address,
          email,
          phone_number,
          payment,
          //cartItems
        }
    },
    myPayments(state){
      return {
        payments:state.user.payment
      }
    }

}

const mutations = {
    setUser(state, {authToken, user, filled}){
      state.filled = filled;
      state.user = user;
      state.authToken = authToken;
    },
    async addAddress(state, {name, streetname, cityname, statename, countryname, setDefault}){
        let storeObj = {
          name,
          street:streetname,
          city:cityname,
          state:statename,
          country:countryname,
          default:setDefault,
        }
        //Do check for saved similar addesses in future here
        state.filled = true;
        state.user.address.push(storeObj);
        localStorage.setItem('user_test', JSON.stringify({
          filled:state.filled,
          authToken:state.authToken,
          user:state.user
        }))
        return {
          ok:true,
          update:{
            address:state.user.address
          }
        }
    },
    async addPayment(state, {ccNumber, ccName, ccExp, setDefault}){
      let storeObj = {
        ccNumber,
        ccName,
        ccExp,
        ccType:"----",
        default:setDefault,
      }
      //Do check for saved similar addesses in future here
      state.filled = true;
      state.user.payment.push(storeObj);
      console.log(state.user.payment)
      localStorage.setItem('user_test', JSON.stringify({
        filled:state.filled,
        authToken:state.authToken,
        user:state.user
      }))
      return {
        ok:true,
        update:{
          payment:state.user.payment
        }
      }
  }
}

const actions = {
    savetoLocal(state, {fresh}){
      if(fresh){
        localStorage.setItem('user_test', JSON.stringify({
          filled:false,
          authToken:"",
          user:{
            id:"",
            name:"",
            email:"",
            phone_number:"",
            address:[],
            payment:{ /*NOT SUGGESTED FOR PRODUCTION --ONLY FOR TEST PURPOSES--*/
              ccNumber:"",
              ccv:"",
              expDate:"",
              ccHoldName:""
            }
          }
        }))
      }else{
        localStorage.setItem('user_test', JSON.stringify({
          filled:state.filled,
          authToken:state.authToken,
          user:state.user
        }))
      }
    },
    loadfromLocal(state){
      let svedDt = localStorage.getItem('user_test');
      let json_ = JSON.parse(svedDt)
      if(svedDt === undefined || svedDt === null){
        state.dispatch('savetoLocal', {fresh:true})
      }else{
          if(json_.filled){
            state.commit('setUser', json_)
          }
      }
    }
}



export {state, mutations, getters, actions}
