
<template>

    <div class="menu">
        <button @click="goToCreation"> Go to creation accounts </button>
    </div>

    <span v-if="accounts === null || accounts.length === 0">Accounts not found :(</span>
    <section class="content__tasks" v-else>
        <ul class="table">
            <li class="table__cell"
                v-for="account in accounts"
                :key="account"
            >
              <account-view
                      :account="account"
                      @delete="(acc) => deleteAccount(acc)"
              />
            </li>
        </ul>
    </section>

</template>

<script>
import {defineComponent} from 'vue'
import AccountView from "@/js_part/views/templates/accounts/AccountView.vue";
import store from "@/js_part/data/store/storages";
import router from "@/js_part/routing/router";

export default defineComponent({
    name: "AccountsPage",
    components: {AccountView},
    data() {
      return {
          accounts: [],
      }
    },
    methods: {
        deleteAccount(acc) {
            this.$tasksat.accounts.delete(acc)
                .then(res => res.json())
                .then(res => {
                    if(res['success']) {
                        const ind = this.accounts.indexOf(acc)
                        if(ind >= 0)
                            this.accounts.splice(ind, 1)
                    }
                })
        },
        loadAccounts() {
            this.$tasksat.accounts.all()
                .then(res => res.json())
                .then(res => this.accounts=res)
        },
        goToCreation() {
          this.$modes.setMainPageRegistrationMode()
          router.push({path: '/home'})
        },
    },
    created() {


        if(store.getters.userMode) {
            router.push({path: '/tasks'})
        }
        if(store.getters.workerMode) {
            router.push({path: '/workspace'})
        }

        this.loadAccounts()
    },
})
</script>


<style scoped>

</style>