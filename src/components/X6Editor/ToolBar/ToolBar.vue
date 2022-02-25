<template>
  <div>
    <div id="toolbar" class="row items-center back-blur">
      <!-- <q-btn flat dense icon="map" @click="shMinimap">
        <q-tooltip :offset="[8, 8]"> 显示缩略图 </q-tooltip>
      </q-btn> -->
      <!-- <q-btn flat dense icon="help" @click="help">
        <q-tooltip :offset="[8, 8]"> 帮助 </q-tooltip>
      </q-btn> -->
      <q-btn-dropdown flat dense icon="settings" class="q-ml-xs">
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
        </q-list>
      </q-btn-dropdown>

      <q-separator vertical inset />

      <q-btn-dropdown flat dense :label="zoom + '%'" class="q-ml-xs" style="width: 68px">
        <q-list dense style="min-width: 100px;">
          <q-item clickable @click="zoomTo(0.5)">
            <q-item-section>
              50%
            </q-item-section>
          </q-item>
          <q-item clickable @click="zoomTo(0.75)">
            <q-item-section>
              75%
            </q-item-section>
          </q-item>
          <q-item clickable @click="zoomTo(1)">
            <q-item-section>
              100%
            </q-item-section>
          </q-item>
          <q-item clickable @click="zoomTo(1.25)">
            <q-item-section>
              125%
            </q-item-section>
          </q-item>
          <q-item clickable @click="zoomTo(1.5)">
            <q-item-section>
              150%
            </q-item-section>
          </q-item>
          <q-item clickable @click="zoomTo(2)">
            <q-item-section>
              200%
            </q-item-section>
          </q-item>
          <q-item clickable @click="zoomTo(3)">
            <q-item-section>
              300%
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
      </q-btn-dropdown>

      <q-separator vertical inset />

      <!-- <div class="q-ml-sm" style="min-width: 40px">{{ zoom }}%</div> -->
      <q-btn flat dense icon="zoom_in" @click="zoomIn" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 放大 (Ctrl + 滚轮向上) </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="zoom_out" @click="zoomOut">
        <q-tooltip :offset="[8, 8]"> 缩小 (Ctrl + 滚轮向下) </q-tooltip>
      </q-btn>

      <q-separator vertical inset class="q-ml-xs" />

      <q-btn flat dense icon="undo" @click="undo" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 撤销 </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="redo" @click="redo">
        <q-tooltip :offset="[8, 8]"> 重做 </q-tooltip>
      </q-btn>

      <!-- <q-separator vertical inset class="q-ml-xs" /> -->

      <!-- <q-btn flat dense icon="visibility" @click="showData" class="q-ml-xs">
        <q-tooltip :offset="[8, 8]"> 查看 json </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="download" @click="downloadData">
        <q-tooltip :offset="[8, 8]"> 导出 json </q-tooltip>
      </q-btn> -->
      <!-- <q-btn-dropdown flat dense icon="description">
        <q-list dense style="min-width: 100px;">
          <q-item clickable v-close-popup @click="showData">
            <q-item-section>
              查看 Json 数据
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="downloadData">
            <q-item-section>
              导出 Json 文件
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->

      <!-- <q-separator vertical inset class="q-ml-xs" />

      <q-btn flat dense icon="grid_4x4" @click="shGrid">
        <q-tooltip :offset="[8, 8]"> 显示网点 </q-tooltip>
      </q-btn> -->

      <q-separator vertical inset class="q-ml-xs" />

      <q-btn flat dense icon="center_focus_weak" @click="centerContent">
        <q-tooltip :offset="[8, 8]"> 居中 </q-tooltip>
      </q-btn>
      <q-btn flat dense icon="timeline" @click="layout">
        <q-tooltip :offset="[8, 8]"> 自动布局 </q-tooltip>
      </q-btn>
      <!-- <q-btn flat dense icon="autorenew" @click="runWorkFlow" class="q-mr-xs">
        <q-tooltip :offset="[8, 8]"> 运行 </q-tooltip>
      </q-btn> -->

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
import { getCurrentInstance } from 'vue';

export default {
  props: {
    zoom: {
      type: Number,
    },
    showGrid: {
      type: Boolean,
    },
    showMinimap: {
      type: Boolean,
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
