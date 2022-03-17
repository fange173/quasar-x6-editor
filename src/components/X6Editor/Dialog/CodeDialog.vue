<template>
  <div>
    <q-dialog v-model="editorStore.openCodeDialog" @update:model-value="close" @escape-key="close" :maximized="maximized" :full-width="maximized">
      <q-card style="min-width: 600px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6 row">
            查看数据
            <q-space />
            <!-- <q-btn dense flat icon="content_copy" @click="copy" /> -->
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
          <!-- <Codemirror v-model:value="data" :options="cmOptions" /> -->
          <json-viewer :value="jsonData" :expand-depth="3" :copyable="{copyText: '复制到剪贴板', copiedText: '复制成功!', timeout: 2000}" :boxed="true" :expanded="true"></json-viewer>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, getCurrentInstance, ref } from 'vue';
// import { copyToClipboard, Notify } from 'quasar';
// import Codemirror from 'codemirror-editor-vue3';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript.js';
import JsonViewer from 'vue-json-viewer';
import 'vue-json-viewer/style.css';
import { useEditorStore } from 'src/stores/editor';

export default {
  components: {
    // Codemirror,
    JsonViewer,
  },
  props: {
    data: {
      type: String,
    },
  },
  setup(props) {
    const _this = getCurrentInstance();
    const maximized = ref(false);
    const editorStore = useEditorStore();

    const jsonData = computed(() => {
      return JSON.parse(props.data);
    });

    const close = () => {
      editorStore.openCodeDialog = false;
      maximized.value = false;
    };

    return {
      // cmOptions: {
      //   mode: 'application/json', // 实现代码高亮
      //   tabSize: 2, // tab的空格个数
      //   matchBrackets: true, // 括号匹配
      //   lineNumbers: true, // 是否显示行数
      //   readOnly: true, // 只读
      // },
      close,
      jsonData,
      maximized,
      editorStore,
    };
  },
};
</script>

<style>
@import url('../X6Editor.css');
</style>
