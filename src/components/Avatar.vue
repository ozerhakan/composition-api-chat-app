<template>
  <img class="avatar" :src="src">
</template>

<script>
export default {
  name: "Avatar",
  props: {
    src: {
      type: String,
      default: ''
    }
  }
}
</script>