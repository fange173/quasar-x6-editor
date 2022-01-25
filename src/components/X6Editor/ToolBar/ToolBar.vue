<template>
  <div>
    <div id="toolbar" class="row items-center blur">
      <q-btn flat dense icon="undo" @click="undo" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 撤销 </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="redo" @click="redo">
        <q-tooltip :offset="[8, 8]"> 重做 </q-tooltip>
      </q-btn>
      <q-separator vertical inset class="q-ml-xs" />
      <div class="q-ml-sm" style="min-width: 40px">{{ zoom }}%</div>
      <q-btn flat dense icon="zoom_in" @click="zoomIn" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 放大 (Ctrl + 滚轮向上) </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="zoom_out" @click="zoomOut">
        <q-tooltip :offset="[8, 8]"> 缩小 (Ctrl + 滚轮向下) </q-tooltip>
      </q-btn>
      <q-separator vertical inset class="q-ml-xs" />
      <q-btn flat dense icon="center_focus_weak" @click="centerContent" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 居中 </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="grid_4x4" @click="shGird">
        <q-tooltip :offset="[8, 8]"> 显示网点 </q-tooltip>
      </q-btn>
      <q-separator vertical inset class="q-ml-xs" />
      <q-btn flat dense icon="visibility" @click="showData" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 查看 json </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="download" @click="downloadData">
        <q-tooltip :offset="[8, 8]"> 导出 json </q-tooltip>
      </q-btn>
      <q-separator vertical inset class="q-ml-xs" />
      <q-btn flat dense color="primary" icon="directions_run" @click="runWorkFlow" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 运行 </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="help" @click="help" class="q-mr-xs">
        <q-tooltip :offset="[8, 8]"> 帮助 </q-tooltip>
      </q-btn>
      <!-- <q-separator vertical inset class="q-ml-xs" />
      <q-btn flat dense icon="format_align_left" @click="shLeftDrawer" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]">
          显示左侧边栏
        </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="format_align_right" @click="shRightDrawer" class="q-ml-xs q-mr-auto">
        <q-tooltip :offset="[8, 8]">
          显示右侧边栏
        </q-tooltip>
      </q-btn> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { getCurrentInstance } from 'vue';

export default {
  props: {
    zoom: {
      type: Number,
    },
  },
  setup() {
    const _this = getCurrentInstance();

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
    const shGird = () => {
      _this.parent.proxy.shGird();
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

    return {
      undo,
      redo,
      zoomIn,
      zoomOut,
      centerContent,
      shGird,
      showData,
      downloadData,
      runWorkFlow,
      help,
    };
  },
};
/* eslint-disable */
</script>
