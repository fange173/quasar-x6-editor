<template>
  <div class="full-width" style="height: 100vh">
    <X6Editor />
  </div>
</template>

<script lang="ts">
import X6Editor from 'components/X6Editor/X6Editor.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { X6Editor },
  setup() {
    return {};
  },
});
</script>
