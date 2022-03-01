<template>
  <div>
    <q-dialog v-model="showCodeDialog" @update:model-value="close" @escape-key="close">
      <q-card style="min-width: 600px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 row">
            查看数据<q-space />
            <!-- <q-btn dense flat icon="content_copy" @click="copy" /> -->
            <q-btn dense flat icon="close" @click="close" />
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <!-- <Codemirror v-model:value="data" :options="cmOptions" /> -->
          <json-viewer :value="jsonData" :expand-depth="3" :copyable="{copyText: '复制到剪贴板', copiedText: '复制成功!', timeout: 2000}" :boxed="true" :expanded="true"></json-viewer>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue';
// import { copyToClipboard, Notify } from 'quasar';
// import Codemirror from 'codemirror-editor-vue3';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript.js';
import JsonViewer from 'vue-json-viewer';
import 'vue-json-viewer/style.css';

export default {
  components: {
    // Codemirror,
    JsonViewer,
  },
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
    const jsonData = computed(() => {
      return JSON.parse(props.data);
    });

    // const copy = () => {
    //   copyToClipboard(props.data)
    //     .then(() => {
    //       Notify.create({
    //         type: 'positive',
    //         message: `已复制数据到剪贴板！`,
    //       });
    //     })
    //     .catch(() => {
    //       Notify.create({
    //         type: 'negative',
    //         message: `复制数据失败！`,
    //       });
    //     });
    // };

    const close = () => {
      _this.parent.proxy.closeCode();
    };

    return {
      // copy,
      close,
      showCodeDialog,
      // cmOptions: {
      //   mode: 'application/json', // 实现代码高亮
      //   tabSize: 2, // tab的空格个数
      //   matchBrackets: true, // 括号匹配
      //   lineNumbers: true, // 是否显示行数
      //   readOnly: true, // 只读
      // },
      jsonData,
    };
  },
};
</script>

<style>
@import url('../X6Editor.css');
</style>
