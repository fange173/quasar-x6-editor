<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { createPinia } from "pinia";

const pinia = createPinia();

export default defineComponent({
  name: 'App'
})
</script>
