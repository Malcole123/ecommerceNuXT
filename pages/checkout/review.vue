<template>
  <MainWrapperVue :_class="'container'" @mounted="checkoutCheck">
    <TheSidebar/>
    <div class="row pt-5 pb-5 g-2">
      <div class="col-lg-8">
        <div class="w-100 d-lg-none d-md-none d-sm-block pt-4 pb-4"></div>
        <div>
          <b-card title="SHIPPING ADDRESS" :sub-title="selected.address.default ? 'Default' : ''" style="letter-spacing:4px">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <div :class="state.addressOk === false ? 'hidden-section' : 'd-block'">
                  <ul class="address_display">
                    <!--Address Template Here-->
                    <li v-for="(line,index) in addressDisplay" :key="'address-line' + index">{{line}}</li>
                  </ul>
                </div>
                <div>
                  <button type="button" class="btn btn-outline-dark" v-if="state.addressOk" v-b-modal="'ship-sel-modal-lg'">Change Address</button>
                  <NuxtLink to="/checkout/address"><button type="button" class="btn btn-outline-dark" v-if="!state.addressOk">Add New Address</button></NuxtLink>
                </div>
              </div>
          </b-card>
        </div>
        <div class="mt-3">
          <b-card title="PAYMENT METHOD" sub-title="Default" style="letter-spacing:4px">
              <div class="d-flex w-100 justify-content-between align-items-start">
                <b-card-text>
                  <!--Add Card Illustration-->
                </b-card-text>
                <button type="button" class="btn btn-outline-dark">Change Payment Method</button>
              </div>
          </b-card>
        </div>
        <div class="mt-3">
          <b-card title="REVIEW YOUR ORDER" style="letter-spacing:4px">
              <div class="d-flex w-100 justify-content-between align-items-start" style="letter-spacing:normal">
                  <CheckoutCartVue :calc="'page-cart'"/>
              </div>
          </b-card>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="w-100 d-lg-none d-md-none d-sm-block pt-2 pb-2"></div>
        <CheckoutSummary/>
      </div>
    </div>
    <!--Select Shipping Address Modal-->
    <LargeModalBase :_id="'ship-sel-modal-lg'" :title="'Select Your Shipping Address'">
          <div class="_modal-body">
              <form class="w-100 select-address-form" @submit.prevent="updateCheckoutAddress">
                <b-list-group>
              <b-list-group-item v-for="(add,i) in clean.address" :key="'address-update'+ i" class="d-flex justify-content-between align-items-center">
                <ul class="address_display">
                    <!--Address Template Here-->
                    <li>{{add.name}}</li>
                    <li>{{add.street}}</li>
                    <li>{{add.city}} , {{add.state}}</li>
                    <li>{{add.country}}</li>
                  </ul>
                <b-form-radio v-model="state.addressInd" :name="'pick-add-radio'+i" :value="i"></b-form-radio>

              </b-list-group-item>
            </b-list-group>
              </form>
              <div class="w-100 d-flex justify-content-center mt-3">
                    <div class="w-50">
                      <DarkButton :text="'Save Changes'" @btnClicked="confirmUpdate"/>
                      <DarkButton :text="'Add New Address'" class="mt-2" @btnClicked="addNewAddress"/>
                    </div>

                </div>
          </div>
    </LargeModalBase>
  </MainWrapperVue>
</template>

<script>
import TheSidebar from '~/components/TheSidebar.vue';
import DarkButton from '~/components/Buttons/DarkButton.vue';
import MainWrapperVue from '~/components/TopLevelWrappers/MainWrapper.vue';
import LargeModalBase from '../../components/Modals/LargeModalBase.vue';
import CheckoutCartVue from '~/components/carts/CheckoutCart.vue';
import CheckoutSummary from '../../components/carts/CheckoutSummary.vue';
export default {
    async mounted() {

    },
    data(){
      return {
        clean:{
          address:[],
        },
        selected:{
          address:{
            name:"",
            street:"",
            city:"",
            country:"",
            state:"",
            default:false
          },
          cart:{},
        },
        state:{
          addressOk:false,
          addressInd:0,
        }
      }
    },
    computed:{
        addressDisplay(){
            return  [
`${this.selected.address.name}`,
`${this.selected.address.street},`,
`${this.selected.address.city},${this.selected.address.state},`,
`${this.selected.address.country},`
        ]
        },
        addressStatus(){

        }
    },
    methods:{
        async checkoutCheck(){
            //Promise to link to live data later
          const checkoutDetails = await this.$store.getters["user/myCheckoutDetails"];
          this.clean.address = checkoutDetails.address;
          //Set to instance
          this.updateCheckoutAddress(0);
          console.log(checkoutDetails.cartItems)
            //Set address from selected address based on id -> Update later to check by default;
        },
        addressSelect(arr_ , { getDef , id_}){
          let sel_ = arr_[id_];
          let retObj = {
            ok:sel_ === undefined ? false : true,
            address:sel_
          }
          return retObj
        },
        setAddress({ok, address}){
          if(ok){
            let keys_ = Object.keys(address);
              keys_.forEach((item,index)=>{
                this.selected.address[item] = address[item];
            })
            this.state.addressOk = true;
          }else{
            this.state.addressOk = false;
          }

        },
        updateCheckoutAddress(id_){
          this.setAddress(this.addressSelect(this.clean.address, {id_:id_}))
        },
        confirmUpdate(){
          this.updateCheckoutAddress(this.state.addressInd);
          //Hide bootstrap modal after update
          this.$bvModal.hide('ship-sel-modal-lg');
          this.showtoastUpdate(5000)
        },
        addNewAddress(){
          this.$bvModal.hide('ship-sel-modal-lg');
          setTimeout(()=>{
            this.$router.push('/checkout/address')
          }, 500)
        },
        showtoastUpdate(timing){
          this.$bvToast.toast('Your shipping address has been updated', {
              title:"Ecom Store Assistant",
              autoHideDelay:timing,
              toaster:'b-toaster-bottom-right'
          })
        }

    },
    components: { TheSidebar, DarkButton, MainWrapperVue, LargeModalBase, CheckoutCartVue, CheckoutSummary }
}
</script>

<style scoped>
  .address_display{
    padding:0px;
    font-weight:600;
    letter-spacing:normal;
  }
  .address_display >* {
    display:block;
  }

  .hidden-section{
    visibility:hidden;
  }

  ._modal-body{
    height:80vh;
    width:100%;
  }

  .select-address-form{
    height:85%;
    width:100%;
    overflow-y:scroll
  }
  .select-address-form::-webkit-scrollbar{
    width:5px;
  }
  .select-address-form::-webkit-scrollbar-thumb{
    width:5px;
    background:black;
  }
  .select-address-form::-webkit-scrollbar-track{
    width:5px;
    background:white;
  }
</style>
