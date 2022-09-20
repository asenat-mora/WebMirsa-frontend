import { defineStore } from 'pinia'

export const quotationStore = defineStore({
    id: 'quotation',
    state: () => ({
        productList: [],
    }),
    getters: {
        getList: (state) => state.productList,
    },
    actions: {
        setItemOnList(payload){
            this.productList.push(payload)
        },
        removeItemFromList(productId){
            this.productList = this.productList.filter(item => item.id !== productId)
        },
        clearList(){
            this.productList = []
        },
    },
    persist: true
})
