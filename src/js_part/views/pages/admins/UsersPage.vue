
<template>

    <span v-if="users !== null && users.length > 0">Users not found :(</span>
    <section class="content__tasks" v-else>
        <ul class="table">
            <li class="table__cell"
                v-for="user in users"
                :key="user"
            >
              <user-view
                      :user="user"
              />
            </li>
        </ul>
    </section>

</template>

<script>
import {defineComponent} from 'vue'
import UserView from "@/js_part/views/templates/users/UserView.vue";

export default defineComponent({
    name: "UsersPage",
    components: {UserView},
    data() {
      return {
          users: []
      }
    },
    methods: {
        loadUsers() {
            this.users = []
        }
    }
})
</script>


<style scoped>

</style>