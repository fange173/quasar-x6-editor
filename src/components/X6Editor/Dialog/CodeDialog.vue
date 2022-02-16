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
import { copyToClipboard, Notify } from 'quasar';
import Codemirror from 'codemirror-editor-vue3';
import 'codemirror/lib/codemirror.css';
import 'codemirror/keymap/sublime'; // sublime编辑器效果
import "codemirror/theme/dracula.css"; // 配置里面也需要设置theme
import "codemirror/mode/vue/vue.js"; // 配置里面也需要mode设置为vue
import 'codemirror/addon/selection/active-line'; // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/mode/javascript/javascript.js';

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
        tabSize: 2, // tab的空格个数
        // theme: 'dracula', // 主题样式
        styleActiveLine: false, // line选择是是否加亮
        matchBrackets: true, // 括号匹配
        mode: 'application/json', // 实现代码高亮
        lineNumbers: true, // 是否显示行数
        readOnly: true, // 只读
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
.CodeMirror-gutter-wrapper {
  left: -35px !important;
}
</style>
