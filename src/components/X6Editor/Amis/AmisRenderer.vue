<template>
  <div id="box"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps({
  amisData: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  const amis = amisRequire('amis/embed');
  const amisScoped = amis.embed('#box', props.amisData);
});
</script>
