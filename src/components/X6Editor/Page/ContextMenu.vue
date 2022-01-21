<template>
  <div style="width: 100%; height: 100%; background: red">
    <q-menu touch-position context-menu>
      <q-list dense style="min-width: 100px" v-if="choiceType == 'node'">
        <q-item clickable v-close-popup>
          <q-item-section @click="showNode">查看</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="nodeSetting">配置</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup>
          <q-item-section @click="deleteNode">删除</q-item-section>
        </q-item>
      </q-list>

      <q-list dense style="min-width: 100px" v-if="choiceType == 'edge'">
        <q-item clickable v-close-popup>
          <q-item-section @click="deleteEdge">删除</q-item-section>
        </q-item>
      </q-list>

      <q-list dense style="min-width: 100px" v-if="choiceType == 'blank'">
        <q-item clickable v-close-popup>
          <q-item-section @click="undo">撤销</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="redo">重做</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-close-popup>
          <q-item-section @click="showData">查看</q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section @click="downloadData">导出</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>更多</q-item-section>
          <q-item-section side>
            <q-icon name="keyboard_arrow_right" />
          </q-item-section>
          <q-menu anchor="top end" self="top start">
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section @click="refresh">清空</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>

<script>
/* eslint-disable */
import { getCurrentInstance } from 'vue';

export default {
  props: {
    choiceType: {
      type: String,
    },
  },
  setup() {
    const _this = getCurrentInstance();

    const showNode = () => {
      _this.parent.ctx.showNode();
    };
    const nodeSetting = () => {
      _this.parent.ctx.nodeSetting();
    };
    const deleteNode = () => {
      _this.parent.ctx.undo();
    };
    const deleteEdge = () => {
      _this.parent.ctx.deleteEdge();
    };
    const undo = () => {
      _this.parent.ctx.undo();
    };
    const redo = () => {
      _this.parent.ctx.redo();
    };
    const showData = () => {
      _this.parent.ctx.showData();
    };
    const downloadData = () => {
      _this.parent.ctx.downloadData();
    };
    const refresh = () => {
      _this.parent.ctx.refresh();
    };

    return {
      showNode,
      nodeSetting,
      deleteNode,
      deleteEdge,
      undo,
      redo,
      showData,
      downloadData,
      refresh,
    };
  },
};
/* eslint-disable */
</script>
