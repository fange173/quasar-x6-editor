<template>
  <div>
    <q-dialog
      v-model="amisStore.showDialog"
      @update:model-value="close"
      @escape-key="close"
      :maximized="maximized"
      :full-width="maximized"
    >
      <q-card style="min-width: 600px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 row">
            配置参数
            <q-space />
            <q-btn dense flat icon="crop_square" v-if="!maximized" @click="maximized = true">
              <q-tooltip :offset="[8, 8]"> 最大化 </q-tooltip>
            </q-btn>
            <q-btn dense flat icon="minimize" v-else @click="maximized = false">
              <q-tooltip :offset="[8, 8]"> 最小化 </q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" @click="close">
              <q-tooltip :offset="[8, 8]"> 关闭 </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <AmisRenderer :amisData="amisStore.jsonData"></AmisRenderer>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref, onMounted } from 'vue';
import { useAmisStore } from 'src/stores/amis';
import AmisRenderer from '../Amis/AmisRenderer.vue';

export default {
  components: {
    AmisRenderer,
  },
  setup() {
    const _this = getCurrentInstance();
    const amisStore = useAmisStore();
    const maximized = ref(false);

    const close = () => {
      amisStore.closeDialog();
      maximized.value = false;
    };

    return {
      close,
      maximized,
      amisStore
    };
  },
};
</script>

<style>
@import url('../X6Editor.css');
</style>
