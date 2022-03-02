<template>
  <div>
    <q-header class="my-header">
      <q-toolbar class="text-black">
        <q-btn flat round dense icon="menu" v-if="showLeftDrawer" @click="shLeftDrawer">
          <q-tooltip :offset="[8, 8]"> 隐藏组件库 </q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="menu_open" v-else @click="shLeftDrawer">
          <q-tooltip :offset="[8, 8]"> 显示组件库 </q-tooltip>
        </q-btn>
        <!-- <q-avatar style="margin-right: -4px">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg" />
        </q-avatar> -->
        <q-toolbar-title>
          <div class="text-body1 text-bold q-px-sm">{{ flow.name }}</div>
          <div class="text-body2 row items-center">
            <div class="q-px-sm cursor-pointer non-selectable relative-position flex flex-center toolbar-a" v-ripple>
              文件
              <q-menu>
                <q-list dense style="min-width: 100px;">
                  <q-item clickable v-close-popup @click="openFileDialog = true">
                    <q-item-section>
                      导入文件
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup @click="showData">
                    <q-item-section>
                      查看数据
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="downloadData">
                    <q-item-section>
                      导出数据
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup @click="saveData">
                    <q-item-section>
                      保存
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable v-close-popup @click="showData">
                    <q-item-section>
                      关闭！
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <div class="q-px-sm cursor-pointer non-selectable relative-position flex flex-center toolbar-a" v-ripple>
              编辑
              <q-menu>
                <q-list dense style="min-width: 100px;">
                  <q-item clickable v-close-popup @click="undo">
                    <q-item-section>
                      撤销
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="redo">
                    <q-item-section>
                      重做
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>更多</q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>
                    <q-menu anchor="top end" self="top start">
                      <q-list dense style="min-width: 100px">
                        <q-item clickable v-close-popup>
                          <q-item-section @click="refresh">清空</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <div class="q-px-sm cursor-pointer non-selectable relative-position flex flex-center toolbar-a" v-ripple>
              视图
              <q-menu>
                <q-list dense style="min-width: 100px;">
                  <q-item clickable @click="shMinimap">
                    <q-item-section>
                      显示缩略图
                    </q-item-section>
                    <q-item-section side>
                      <q-icon left name="check_box_outline_blank" class="q-mr-none" v-if="!showMinimap" />
                      <q-icon left name="check_box" class="q-mr-none" v-else />
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="shGrid">
                    <q-item-section>
                      显示网点
                    </q-item-section>
                    <q-item-section side>
                      <q-icon left name="check_box_outline_blank" class="q-mr-none" v-if="!showGrid" />
                      <q-icon left name="check_box" class="q-mr-none" v-else />
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="zoomIn">
                    <q-item-section>
                      放大
                    </q-item-section>
                    <q-item-section side>
                      Ctrl+滚轮向上
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="zoomOut">
                    <q-item-section>
                      缩小
                    </q-item-section>
                    <q-item-section side>
                      Ctrl+滚轮向下
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="centerContent">
                    <q-item-section>
                      居中
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="layout">
                    <q-item-section>
                      自动布局
                    </q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="zoomTo(1)">
                    <q-item-section>
                      重置比例
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="zoomToFit">
                    <q-item-section>
                      适应内容
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <div class="q-px-sm cursor-pointer non-selectable relative-position flex flex-center toolbar-a" v-ripple @click="help">
              帮助
            </div>
          </div>
        </q-toolbar-title>
        <q-btn dense push color="primary" icon="autorenew" label="运行" @click="runWorkFlow" />
        <q-btn flat round dense icon="menu" v-if="showRightDrawer" @click="shRightDrawer" class="q-ml-md">
          <q-tooltip :offset="[8, 8]"> 隐藏编辑 </q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="menu_open" v-else @click="shRightDrawer" class="q-ml-md">
          <q-tooltip :offset="[8, 8]"> 显示编辑 </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-dialog persistent v-model="openFileDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">选择文件</div>
        </q-card-section>
        <q-card-section class="q-px-md">
          <q-file
            v-model="file"
            filled
            counter
            accept=".json"
            style="width: 300px"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" @click="cancel" v-close-popup />
          <q-btn flat label="确定" color="primary" @click="importJson" data-autofocus="true" :disabled="!file" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from 'vue';

export default {
  props: {
    showGrid: {
      type: Boolean,
    },
    showMinimap: {
      type: Boolean,
    },
    flow: {
      type: Object,
    },
    showLeftDrawer: {
      type: Boolean,
    },
    showRightDrawer: {
      type: Boolean,
    },
  },
  setup() {
    const _this = getCurrentInstance();
    const openFileDialog = ref(false);
    const file = ref(null);

    const undo = () => {
      _this.parent.proxy.undo();
    };
    const redo = () => {
      _this.parent.proxy.redo();
    };
    const zoomIn = () => {
      _this.parent.proxy.zoomIn();
    };
    const zoomOut = () => {
      _this.parent.proxy.zoomOut();
    };
    const centerContent = () => {
      _this.parent.proxy.centerContent();
    };
    const shGrid = () => {
      _this.parent.proxy.shGrid();
    };
    const shMinimap = () => {
      _this.parent.proxy.shMinimap();
    };
    const layout = () => {
      _this.parent.proxy.layout();
    };
    const showData = () => {
      _this.parent.proxy.showData();
    };
    const downloadData = () => {
      _this.parent.proxy.downloadData();
    };
    const runWorkFlow = () => {
      _this.parent.proxy.runWorkFlow();
    };
    const help = () => {
      _this.parent.proxy.help();
    };
    const zoomTo = (num) => {
      _this.parent.proxy.zoomTo(num);
    };
    const zoomToFit = () => {
      _this.parent.proxy.zoomToFit();
    };
    const refresh = () => {
      _this.parent.proxy.refresh();
    };
    const cancel = () => {
      file.value = null;
    }
    const saveData = () => {
      _this.parent.proxy.saveData();
    }
    const importJson = () => {
      let reader = new FileReader();
      reader.readAsText(file.value);
      reader.onload = (() => {
        _this.parent.proxy.importJson(JSON.parse(reader.result));
        file.value = null;
      });
    }
    const shLeftDrawer = () => {
      _this.parent.proxy.shLeftDrawer();
    };
    const shRightDrawer = () => {
      _this.parent.proxy.shRightDrawer();
    };

    return {
      undo,
      redo,
      zoomIn,
      zoomOut,
      centerContent,
      shGrid,
      layout,
      showData,
      downloadData,
      runWorkFlow,
      help,
      shMinimap,
      zoomTo,
      zoomToFit,
      refresh,
      openFileDialog,
      file,
      importJson,
      cancel,
      saveData,
      shLeftDrawer,
      shRightDrawer,
    };
  },
};
</script>

<style scoped>
@import url('../X6Editor.css');
.q-item__section--side > .q-icon {
  margin-right: -8px;
}
</style>
