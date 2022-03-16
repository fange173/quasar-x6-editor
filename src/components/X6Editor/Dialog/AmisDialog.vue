<template>
  <div>
    <q-dialog
      v-model="showAmisDialog"
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
          <AmisRenderer :amisData="amisData"></AmisRenderer>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref, onMounted } from 'vue';
import AmisRenderer from '../Amis/AmisRenderer.vue';

export default {
  components: {
    AmisRenderer,
  },
  props: {
    openAmisDialog: {
      type: Boolean,
    },
    jsonData: {
      type: Object,
    },
  },
  setup(props) {
    const _this = getCurrentInstance();
    const maximized = ref(false);

    const amisData = {
      type: 'page',
      body: [
        {
          label: 'name',
          type: 'input-text',
          name: 'name',
          value: props.jsonData.name,
        },
        {
          label: 'externalId',
          type: 'input-text',
          name: 'externalId',
          value: props.jsonData.externalId,
        },
        {
          label: 'materialName',
          type: 'input-text',
          name: 'materialName',
          value: props.jsonData.materialName,
        },

        {
          type: 'form',
          mode: 'horizontal',
          debug: true,
          body: [
            {
              label: 'name',
              type: 'input-text',
              name: 'name',
              value: props.jsonData.name,
            },
            {
              label: 'externalId',
              type: 'input-text',
              name: 'externalId',
              value: props.jsonData.externalId,
            },
            {
              label: 'materialName',
              type: 'input-text',
              name: 'materialName',
              value: props.jsonData.materialName,
            },
          ],
        },
      ],
    };

    const showAmisDialog = computed(() => {
      return props.openAmisDialog;
    });
    // const amisData = computed(() => {
    //   return JSON.parse(props.data);
    // });

    const close = () => {
      _this.parent.proxy.closeCode();
      maximized.value = false;
    };

    return {
      close,
      showAmisDialog,
      amisData,
      maximized,
    };
  },
};
</script>

<style>
@import url('../X6Editor.css');
</style>
