export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as TheSidebar } from '../../components/TheSidebar.vue'
export { default as ButtonsAddCartButton } from '../../components/Buttons/AddCartButton.vue'
export { default as ButtonsDarkButton } from '../../components/Buttons/DarkButton.vue'
export { default as ButtonsDarkOutlineButton } from '../../components/Buttons/DarkOutlineButton.vue'
export { default as ButtonsViewCartBtn } from '../../components/Buttons/ViewCartBtn.vue'
export { default as FormsAddressFormVue } from '../../components/Forms/AddressFormVue.vue'
export { default as FormsPaymentForm } from '../../components/Forms/PaymentForm.vue'
export { default as ModalsLargeModalBase } from '../../components/Modals/LargeModalBase.vue'
export { default as TopLevelWrappersMainWrapper } from '../../components/TopLevelWrappers/MainWrapper.vue'
export { default as TopLevelWrappersProtectedContentWrapper } from '../../components/TopLevelWrappers/ProtectedContentWrapper.vue'
export { default as CardsCartCard } from '../../components/cards/CartCard.vue'
export { default as CardsTheMainProductCard } from '../../components/cards/TheMainProductCard.vue'
export { default as CartsCheckoutCart } from '../../components/carts/CheckoutCart.vue'
export { default as CartsCheckoutSummary } from '../../components/carts/CheckoutSummary.vue'
export { default as CartsEmbededCart } from '../../components/carts/EmbededCart.vue'
export { default as IconsHalfRatingIcon } from '../../components/icons/HalfRatingIcon.vue'
export { default as IconsHomeIcon } from '../../components/icons/HomeIcon.vue'
export { default as IconsMenuIcon } from '../../components/icons/MenuIcon.vue'
export { default as IconsRatingIcon } from '../../components/icons/RatingIcon.vue'
export { default as IconsTrashIcon } from '../../components/icons/TrashIcon.vue'
export { default as InputsMainSearch } from '../../components/inputs/MainSearch.vue'
export { default as ButtonsNavigationButtonsBackButton } from '../../components/Buttons/NavigationButtons/BackButton.vue'
export { default as InputsFormInputsCheckboxInputVue } from '../../components/inputs/FormInputs/CheckboxInputVue.vue'
export { default as InputsFormWrapper } from '../../components/inputs/FormInputs/FormWrapper.vue'
export { default as InputsFormInputsTextInput } from '../../components/inputs/FormInputs/TextInput.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
