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
  let amis = amisRequire('amis/embed');
  console.log(amis);
  let amisScoped = amis.embed('#box', props.amisData);
});
</script>
