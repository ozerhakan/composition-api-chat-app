<template>
  <nav style="background-color: #374151">
    <div>
      <h1>Vue3 Composition Api Chat Room</h1>
      <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>
      <button v-else class="bg-green-500 hover:bg-green-600" @click="signIn">
        Sign In
      </button>
    </div>
  </nav>
</template>

<script>
import Avatar from './Avatar.vue';
import { useAuth } from "../firebase";

export default {
  name: "Nav",
  components: {
    Avatar
  },
  setup() {
    const { user, isLogin, signOut, signIn } = useAuth();

    return {
      user,
      isLogin,
      signOut,
      signIn
    }
  }
}
</script>