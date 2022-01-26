<template>
  <div>
    <q-dialog v-model="showCodeDialog" @update:model-value="close" @escape-key="close">
      <q-card style="min-width: 600px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 row">
            查看数据<q-space /><q-btn dense flat icon="content_copy" @click="copy" /><q-btn
              dense
              flat
              icon="close"
              @click="close"
            />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <Codemirror v-model:value="data" :options="cmOptions" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { computed, getCurrentInstance } from 'vue';
import Codemirror from 'codemirror-editor-vue3';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import { copyToClipboard, Notify } from 'quasar';

export default {
  components: { Codemirror },
  props: {
    openCodeDialog: {
      type: Boolean,
    },
    data: {
      type: String,
    },
  },
  setup(props) {
    const _this = getCurrentInstance();

    const showCodeDialog = computed(() => {
      return props.openCodeDialog;
    });

    const copy = () => {
      copyToClipboard(props.data).then(() => {
        Notify.create({
          type: 'positive',
          message: `已复制数据到剪贴板！`,
        });
      }).catch(() => {
        Notify.create({
          type: 'negative',
          message: `复制数据失败！`,
        });
      });
    };

    const close = () => {
      _this.parent.proxy.closeCode();
    };

    return {
      copy,
      close,
      showCodeDialog,
      cmOptions: {
        mode: 'application/json',
        lineNumbers: true,
        readOnly: false,
      },
    };
  },
};
/* eslint-disable */
</script>

<style>
.CodeMirror-gutters {
  left: 0 !important;
}
.CodeMirror-linenumber {
  left: -35px !important;
}
</style>
